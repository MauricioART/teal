"use client";
import { useState, Fragment } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewDeckForm from './create-deck-form';
import NewCardForm from './create-card-form';
import { Card } from '@/app/lib/definitions';
import CardCollection from './card-collection';
import { createCard, createDeck } from '@/app/lib/actions';

const steps = ['Deck Info', 'Create cards', 'Submit'];

interface DeckFormData {
  name: string;
  description: string;
  image: File | null;
}

interface Props {
  user_id: string;
}

export default function CreateDeckStepper(props: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [formData, setFormData] = useState<DeckFormData>({
    name: "",
    description: "",
    image: null,
  });
  const [deck, setDeck] = useState<Card[]>([]);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };


  const handleSubmit = async () => {
    const deckFormData = new FormData;
    deckFormData.append('name',formData.name);
    deckFormData.append('description',formData.description);
    deckFormData.append('owner_id',props.user_id);
    const deckId = await createDeck(deckFormData);
    if (deckId){
      deck.map(async (card, index)=>{
        await createCard(deckId,card,'/learn/decks/');
      });
      
    }
    setActiveStep(0);
    setDeck([]);
    setFormData({
      name: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className='grid grid-cols-1 grid-rows-5 items-center m-2 p-2 w-full h-full justify-around'>
      <div className='row-span-4 h-full'>
        {activeStep === 0 && <NewDeckForm owner_id={props.user_id} formData={formData} setFormData={setFormData} />}
        {activeStep === 1 && <NewCardForm deck={deck} setDeck={setDeck}/>}
        {activeStep === 2 && <CardCollection add={false} cards={deck} deck_id={null}/> }
      </div>
      <div className=''>
        <div className='px-5'>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              
            </Fragment>
          ) : (
            <Fragment>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}
                <Button onClick={()=>{
                  if (activeStep === steps.length - 1) 
                    handleSubmit();
                  else
                    handleNext();
                  }}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
