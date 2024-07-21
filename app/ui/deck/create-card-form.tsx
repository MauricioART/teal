"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import Button from "../button";
import { Card } from "@/app/lib/definitions";
import UpdateCardCarousel from "./update-card-carousel";
import { Switch,  Select, SelectChangeEvent } from "@mui/material";
import { Box, MenuItem } from "@mui/material";
import Badge from '@mui/material/Badge';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

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
  const [checked, setChecked] = useState(true);
  const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) =>{
    setChecked(event.target.checked);
    setCard({ ...card, answer: event.target.checked ? 0 : 1 });
  }
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      {cardType === 0 && (
        <div className="flex justify-around items-center h-full p-6">
          <div className="flex flex-col items-start">
            <label className="ml-2"> Question</label>
            <textarea
              id="question"
              name="question"
              placeholder="QUESTION"
              rows={4}
              cols={45}
              className="focus:outline-teal-400 focus:border-none p-2 rounded-lg border-teal-500 border-2"
              value={card.question}
              onChange={(event) => setCard({ ...card, question: event.target.value })}
              required
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="" className="ml-2">Answer</label>
            <textarea
              id="answer"
              name="answer"
              rows={4}
              placeholder="ANSWER"
              cols={45}
              className="focus:outline-teal-400 focus:border-none p-2 rounded-lg border-teal-500 border-2"
              value={card.answer}
              onChange={(event) => setCard({ ...card, answer: event.target.value })}
              required
            />
          </div>
        </div>
      )}
      {cardType === 1 && (
        <div className="flex justify-around items-center h-full ">
          <div className="flex flex-col">
            <label htmlFor="">Question</label>
            <textarea
              id="question"
              name="question"
              placeholder="QUESTION"
              rows={6}
              cols={50}
              className="focus:outline-none focus:outline-teal-400 p-2 rounded-lg border-teal-500 border-2"
              value={card.question}
              onChange={(event) => setCard({ ...card, question: event.target.value })}
              required
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            {card.options && card.options.map((option, index) => (
              <div key={index} className="flex flex-col">
              <label htmlFor="" className="" >Option {index + 1}</label>
              <input
                type="text"
                placeholder={index === 0 ? "CORRECT ANSWER" : "INCORRECT ANSWER"}
                value={option}
                className="pl-1 border-2 rounded-lg focus:border-teal-400 border-teal-500 mb-1 w-96"
                onChange={(e) => handleOptionChange(index, e.target.value)}
              /></div>
            ))}
          </div>
        </div>
      )}
      {cardType === 2 && (
        <div className="flex flex-col items-center h-full px-5 mx-5">
          <textarea
            id="question"
            name="question"
            placeholder="QUESTION"
            rows={6}
            cols={60}
            className="focus:outline-none focus:outline-teal-400 p-2 rounded-lg border-teal-500 border-2"
            value={card.question}
            onChange={(event) => setCard({ ...card, question: event.target.value })}
            required
          />
          <Switch className="self-end" checked={checked} onChange={handleChecked} color="success">
          </Switch>
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
        className="border-2 border-teal-500 rounded-lg  focus:outline-teal-400 focus:border-none p-4"
        value={input}
        onChange={handleChange}
        required
      />
      <Button onClick={handleAdd}>Add</Button>
    </div>
  );
};


export default function NewCardForm({deck, setDeck}:{deck?:Card[], setDeck?:React.Dispatch<React.SetStateAction<Card[]>>}) {
  const width = 160;
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const cardIconsPath = ["Reveal-Card.svg","4-Optional-Card.svg","True-False-Card.svg"];
  
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCardType = (event: SelectChangeEvent) => {
    const selectedCardType = Number(event.target.value);
    setCardClass(selectedCardType);
    setCard({ ...card, card_type: selectedCardType });
  };

  const addCard = () => {
    const deckBuffer = localDeck;
    switch(card.card_type){
      case 0:
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
  };

  return (
    <div className="mx-5 px-5 py-4 bg-gray-200 rounded-md border-2 border-dotted border-green-400">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="justify-between">
          <Tab label="One by one creation" {...a11yProps(0)} />
          <Tab label="Batch creation" {...a11yProps(1)} />
          <button  className="self-center ml-auto mr-10">
            <Badge badgeContent={localDeck.length} color="primary" >
              <LibraryBooksIcon color="action" />
            </Badge>
          </button>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="new-card-div">
          <div className="card-img flex justify-center items-center">
            <Image
              key={0}
              id="0"
              src={"/icons/" + cardIconsPath[cardClass]} 
              alt="True-False Card"
              width={width}
              height={1.5 * width}
            />
          </div>

          <div className="card-form flex flex-col">
          <Fragment>
            <Select className="w-52 h-8  self-end mr-12"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={`${cardClass}`}
              label="CardType"
              onChange={handleCardType}
            >
              <MenuItem value={0}>Reveal Card</MenuItem>
              <MenuItem value={1}>4 Option Card</MenuItem>
              <MenuItem value={2}>True-False Card</MenuItem>
            </Select>
            <div className="mt-10 mb-10">
              <CardForm cardType={cardClass} card={card} setCard={setCard} />
            </div>
            <Button className="h-6 w-16 self-end mr-12"   
            onClick={()=>{
              try{
                addCard();

              }catch(Error){
                console.log(Error);
              }
            }}> Add </Button>
          </Fragment>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
          <BatchCreationTab  onAdd={handleBatchAdd}/>
      </CustomTabPanel>
      <UpdateCardCarousel 
            deck={deck ? deck : []}
            setDeck={setDeck ? setDeck : ()=>{}}
            open={open}
            handleClose={setOpen}
            index={currentIndex != null ? currentIndex : 0}
            setIndex={setCurrentIndex}
        />
    </div>
  );
}
