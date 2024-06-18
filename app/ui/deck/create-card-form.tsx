import { Fragment, useState } from "react";
import { createCard } from "@/app/lib/actions";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box } from "@mui/material";
import Image from "next/image";
import Button from "../button";
import { Card } from "@/app/lib/definitions";


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

function a11yProps(index: number) {
    return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CardForm(cardType: number, card: Card, setCard: React.Dispatch<React.SetStateAction<Card>>){
  const [options, setOptions] = useState<string[]>(["","","",""]);

  return(
    <Box sx={{ height: '100%',  width: '100%'}}>
    { cardType == 0 && (
      <div className="flex justify-around items-center h-48 p-10">
        <div>
        <textarea
                id="question"
                name="question"
                placeholder="QUESTION"
                rows={4}
                cols={50}
                className="focus:outline-none focus:border-none p-2"
                value={card.question}
                onChange={(event)=>{setCard({...card,[event.target.name]: event.target.value})}}
                required
              ></textarea>
        </div>
        <div className="flex flex-col content-start">
          <div>
            <input type="radio" id="true" name="answer" value="True" 
                onChange={(event) => {setCard({...card, answer: 0})}}
            />
            <label htmlFor="true">True</label>
          </div>
          <div>
            <input type="radio" id="false" name="answer" value="False" 
                onChange={(event) => {setCard({...card, answer: 1})}}
            />
            <label htmlFor="false">False</label>
          </div>
          
        </div>
      </div>
    )}
    { cardType == 1 && (
      <div className="flex justify-around items-center h-48 p-10">
        <div>
        <textarea
                id="question"
                name="question"
                placeholder="QUESTION"
                rows={4}
                cols={50}
                className="focus:outline-none focus:border-none p-2"
                value={card.question}
                onChange={(event)=>{setCard({...card,[event.target.name]: event.target.value})}}
                required
              ></textarea>
        </div>
        <div className="flex flex-col content-around">
          <input type="text" placeholder="CORRECT ANSWER" value={options[0]} 
            onChange={()=>{
              setOptions(options);
              setCard({...card, options: options});
          }}/>
          
          <input type="text" placeholder="INCORRECT ANSWER" value={options[1]}  onChange={()=>{
              setOptions(options);
              setCard({...card, options: options});
          }}/>
          
          <input type="text" placeholder="INCORRECT ANSWER" value={options[2]}  onChange={()=>{
              setOptions(options);
              setCard({...card, options: options});
          }}/>
          
          <input type="text" placeholder="INCORRECT ANSWER" value={options[3]}  onChange={()=>{
              setOptions(options);
              setCard({...card, options: options});
          }}/>
        </div>
      </div>
    )}
    { cardType == 2 && (
    <div className="flex justify-around items-center h-48 p-10">
      <textarea
                id="question"
                name="question"
                placeholder="QUESTION"
                rows={4}
                cols={50}
                className="focus:outline-none focus:border-none p-2"
                value={card.question}
                onChange={(event)=>{setCard({...card,[event.target.name]: event.target.value})}}
                required
              ></textarea>
      <textarea
                id="answer"
                name="answer"
                rows={4}
                placeholder="ANSWER"
                cols={50}
                className="focus:outline-none focus:border-none p-2"
                value={card.answer}
                onChange={(event)=>{setCard({...card,[event.target.name]: event.target.value})}}
                required
              ></textarea>
    </div>)}

    </Box>
  );
}

export default function NewCardForm (){
  
  const width = 190;
  let cards: Card[] = [];
  const [value, setValue] = useState(0);
  const [cardClass, setCardClass] = useState<number| null>(null);
  const [card,setCard] = useState<Card>({
    question: "",
    answer: "",
    options: [],
    cardType: null,
  });


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCardType = (event: React.SyntheticEvent) => {
    setCardClass(Number(event.currentTarget.id));
    setCard({...card, cardType: Number(event.currentTarget.id) })
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="One by one creation" {...a11yProps(0)} />
          <Tab label="Batch creation" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div className="flex justify-evenly items-center h-5/6">
        <Fragment>
            <Image 
                key={0}
                id="0"
                src="/icons/True-False-Card.svg"
                alt="True-False Card"
                width={width}
                height={1.5 * width}
                onClick={handleCardType}
            />
            <Image 
                key={1}
                id="1"
                src="/icons/4-Optional-Card.svg"
                alt="4 Optional Card"
                width={width}
                height={1.5 * width}
                onClick={handleCardType}
            />
            <Image
                key={2} 
                id="2"
                src="/icons/Reveal-Card.svg"
                alt="Reveal Card"
                width={width}
                height={1.5 * width}
                onClick={handleCardType}
            /></Fragment>
      </div>
      { cardClass != null && ( 
        <Fragment>
        <div> {CardForm(cardClass, card, setCard) }
        </div>
      <div>
        <Button> Add </Button>
      </div></Fragment>)} 
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="flex justify-around items-center h-full p-10 ">
        <textarea
                id="question"
                name="batch"
                placeholder="Example:
                              1,What does ANSI stand for?, American National Security Intelligence"
                rows={10}
                cols={90}
                className="focus:outline-none focus:border-none p-4"
                required
              ></textarea>
        <Button onClick={()=>{console.log(card)}}> Add</Button>
        </div>
      </CustomTabPanel>
    </Box>
  );
}