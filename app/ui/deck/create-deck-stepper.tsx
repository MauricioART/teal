"use client";
import { useState, Fragment, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import NewDeckForm from './create-deck-form';
import NewCardForm from './create-card-form';


const steps = ['Deck Info', 'Create cards', 'Submit'];

interface FormData {
  name: string;
  description: string;
  image: File | null;
}

interface Props{
    client_id: string,
};

export default function CreateDeckStepper(props: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [content, setContent] = useState<React.ReactNode>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    switch (activeStep) {
      case 0:
        setContent(<NewDeckForm owner_id={props.client_id} formData={formData} setFormData={setFormData} />);
        break;
      case 1:
        setContent(<NewCardForm />);
        break;
      case 2:
      default:
        setContent(null);
    }
  }, [activeStep, props.client_id]);

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
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
 

  return (
    <div className='flex flex-col items-center m-2 p-2 w-full h-full justify-around'>
      <div className=' w-full mb-16'>{content}

      </div>
      <div className='relative w-full'>
      <div className='fixed w-4/5 bottom-5'>
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
              <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
              </Box>
              </Fragment>
          ) : (
              <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
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
                  <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
              </Box>
              </Fragment>
          )}
      
      </div></div>
    </div>
  );
}
