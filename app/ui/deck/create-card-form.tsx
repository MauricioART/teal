"use client";
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

function CardForm({ cardType, card, setCard }: { cardType: number, card: Card, setCard: React.Dispatch<React.SetStateAction<Card>> }) {

  const handleOptionChange = (index: number, value: string) => {
    if (card.options != undefined){
    const newOptions = [...card.options];
    newOptions[index] = value;
    setCard({ ...card, options: newOptions });
  }
  };

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {cardType === 0 && (
        <div className="flex justify-around items-center h-48 p-10">
          <textarea
            id="question"
            name="question"
            placeholder="QUESTION"
            rows={4}
            cols={50}
            className="focus:outline-none focus:border-none p-2"
            value={card.question}
            onChange={(event) => setCard({ ...card, question: event.target.value })}
            required
          />
          <div className="flex flex-col">
            <label>
              <input type="radio" name="answer" value="True"
                onChange={() => setCard({ ...card, answer: 0 })}
              />
              True
            </label>
            <label>
              <input type="radio" name="answer" value="False"
                onChange={() => setCard({ ...card, answer: 1 })}
              />
              False
            </label>
          </div>
        </div>
      )}
      {cardType === 1 && (
        <div className="flex justify-around items-center h-48 p-10">
          <textarea
            id="question"
            name="question"
            placeholder="QUESTION"
            rows={4}
            cols={50}
            className="focus:outline-none focus:border-none p-2"
            value={card.question}
            onChange={(event) => setCard({ ...card, question: event.target.value })}
            required
          />
          <div className="flex flex-col">
            {card.options && card.options.map((option, index) => (
              <input
                key={index}
                type="text"
                placeholder={index === 0 ? "CORRECT ANSWER" : "INCORRECT ANSWER"}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>
      )}
      {cardType === 2 && (
        <div className="flex justify-around items-center h-48 p-10">
          <textarea
            id="question"
            name="question"
            placeholder="QUESTION"
            rows={4}
            cols={50}
            className="focus:outline-none focus:border-none p-2"
            value={card.question}
            onChange={(event) => setCard({ ...card, question: event.target.value })}
            required
          />
          <textarea
            id="answer"
            name="answer"
            rows={4}
            placeholder="ANSWER"
            cols={50}
            className="focus:outline-none focus:border-none p-2"
            value={card.answer}
            onChange={(event) => setCard({ ...card, answer: event.target.value })}
            required
          />
        </div>
      )}
    </Box>
  );
}

const BatchCreationTab: React.FC<{ onAdd: (input: string) => void }> = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleAdd = () => {
    onAdd(input);
    setInput('');
  };

  return (
    <div className="flex justify-around items-center h-full p-10 ">
      <textarea
        id="batch"
        name="batch"
        placeholder="Example:\n 1;What does ANSI stand for?;American National Standards Institute"
        rows={10}
        cols={90}
        className="focus:outline-none focus:border-none p-4"
        value={input}
        onChange={handleChange}
        required
      ></textarea>
      <Button onClick={handleAdd}>Add</Button>
    </div>
  );
};


export default function NewCardForm({deck, setDeck}:{deck?:Card[], setDeck?:React.Dispatch<React.SetStateAction<Card[]>>}) {
  const width = 190;
  const [value, setValue] = useState(0);
  const [cardClass, setCardClass] = useState<number>(0);
  const [card, setCard] = useState<Card>({
    card_id: null,
    deck_id: null,
    question: "",
    answer: "",
    options: ["","","",""],
    card_type: 0,
  });
  const [localDeck, setLocalDeck] = useState<Card[]>(deck || []);
  
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCardType = (event: React.SyntheticEvent) => {
    const selectedCardType = Number(event.currentTarget.id);
    setCardClass(selectedCardType);
    setCard({ ...card, card_type: selectedCardType });
  };

  const addCard = () => {
    const deckBuffer = localDeck;
    switch(card.card_type){
      case 0:
        if(card.question != ""){
          if(card.answer == 0 || card.answer == 1){
            deckBuffer.push({
              card_id: null,
              deck_id: null,
              card_type: card.card_type, 
              question: card.question,
              answer: card.answer
            });
            if (setDeck) {
              setDeck(deckBuffer);
            } else {
              setLocalDeck(deckBuffer);
            }
          }else {
            throw new Error("Select true or false");
          }
        } else{
          throw new Error("Question field empty!")
        }
        break;
      case 1:
        if(card.question != ""){
          if(card.options != undefined && card.options.length > 1){
            deckBuffer.push({
              card_id: null,
              deck_id: null,
              card_type: card.card_type, 
              question: card.question,
              answer: 0,
              options: card.options
            });
            if (setDeck) {
              setDeck(deckBuffer);
            } else {
              setLocalDeck(deckBuffer);
            }
          } else{
            throw new Error("You need at least 2 answer options.");
          }
        }else{
          throw new Error("Question field empty!");
        }
        
        break;
      case 2:
        if(card.question != ""){
          if(card.answer != ""){
            deckBuffer.push({
              card_id: null,
              deck_id: null,
              card_type: card.card_type, 
              question: card.question,
              answer: card.answer,
            });
            if (setDeck) {
              setDeck(deckBuffer);
            } else {
              setLocalDeck(deckBuffer);
            }
          }else {
            throw new Error("Answer field empty!");
          }
        }else{
          throw new Error("Question field empty!");
        }
        break;
      default:
        throw new Error("CardType error");
        break;

    }
    setCard({
      card_id: null,
      deck_id: null,
      question: "",
      answer: "",
      options: ["","","",""],
      card_type: 0,
    });

  };
  const handleBatchAdd = (input: string) => {
    const deckBuffer = localDeck;
    let errorLines : number[] = [];
    console.log("Batch Input:", input);
    const cardsStr = input.split("\n");
    cardsStr.map((cardStr,index)=>{
      const tokens = cardStr.split("|");
      switch(tokens[0]){
        case "0":
          if (tokens.length == 3){
            deckBuffer.push({
              card_id: null,
              deck_id: null,
              card_type: 0, 
              question: tokens[1],
              answer: tokens[2],
            });
          }
          else{
            errorLines.push(index);
          }
          break;
        case "1": 
          if (tokens.length >= 5){
            deckBuffer.push({
              card_id: null,
              deck_id: null,
              card_type: 1, 
              question: tokens[1],
              answer: 0,
              options: tokens.filter((_,index)=>index >= 2),
            });
          }
          else{
            errorLines.push(index);
          }
          break;
        case "2":
          if (tokens.length == 3){
            deckBuffer.push({
              card_id: null,
              deck_id: null,
              card_type: 2, 
              question: tokens[1],
              answer: tokens[2],
            });
          }
          else{
            errorLines.push(index);
          }
          break;
        default:
          errorLines.push(index);
          break;      
      }
    });
    if (setDeck) {
      setDeck(deckBuffer);
    } else {
      setLocalDeck(deckBuffer);
    }
    console.log(deck);
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
          />
        </div>
        {cardClass != null && (
          <Fragment>
            <CardForm cardType={cardClass} card={card} setCard={setCard} />
            <Button onClick={()=>{
              try{
                addCard();

              }catch(Error){
                console.log(Error);
              }
            }}> Add </Button>
          </Fragment>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <BatchCreationTab  onAdd={handleBatchAdd}/>
      </CustomTabPanel>
    </Box>
  );
}
