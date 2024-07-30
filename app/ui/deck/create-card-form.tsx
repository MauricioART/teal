"use client";
import { Fragment, useState } from "react";
import Image from "next/image";
import Button from "../button";
import { Card } from "@/app/lib/definitions";
import UpdateCardCarousel from "./update-card-carousel";
import { Box} from "@mui/material";
import Badge from '@mui/material/Badge';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { ClassNames } from "@emotion/react";

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

function CardForm({ card, setCard }: {card: Card, setCard: React.Dispatch<React.SetStateAction<Card>> }) {

   return (
    <Box sx={{ height: '100%', width: '100%' }}>
      
        <div className="flex flex-col lg:flex-row justify-around items-center h-full p-6">
          <div className="flex flex-col items-start">
            <label className="ml-2"> Question</label>
            <textarea
              id="question"
              name="question"
              placeholder="QUESTION"
              rows={4}
              cols={45}
              className="focus:outline-teal-400 focus:border-none p-2 rounded-lg border-teal-500 border-2"
              value={card.front}
              onChange={(event) => setCard({ ...card, front: event.target.value })}
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
              value={card.back}
              onChange={(event) => setCard({ ...card, back: event.target.value })}
              required
            />
          </div>
        </div>
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
    <div className="flex flex-col justify-around items-center h-full">
      <textarea
        id="batch"
        name="batch"
        placeholder="Example:\n 1;What does ANSI stand for?;American National Standards Institute"
        className="border-2 border-teal-500 rounded-lg  focus:outline-teal-400 focus:border-none p-4 w-full lg:w-2/3 h-[267.2px]"
        value={input}
        onChange={handleChange}
        required
      />
      <Button onClick={handleAdd} className="h-6 w-16 self-end mr-12">Add</Button>
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
    front: "",
    back: "",
  });
  const [localDeck, setLocalDeck] = useState<Card[]>(deck || []);
  const cardIconsPath = ["Reveal-Card.svg","4-Optional-Card.svg","True-False-Card.svg"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  

  const addCard = () => {
    const deckBuffer = localDeck;
    if(card.front != ""){
      if(card.back != ""){
        deckBuffer.push({
          card_id: null,
          deck_id: null,
          front: card.front,
          back: card.back,
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

    setCard({
      card_id: null,
      deck_id: null,
      front: "",
      back: "",
    })
  };

  const handleBatchAdd = (input: string) => {
    const deckBuffer = localDeck;
    let errorLines : number[] = [];
    const cardsStr = input.split("\n");
    cardsStr.map((cardStr,index)=>{
      const tokens = cardStr.split("|");
      switch(tokens[0]){
        case "0":
          if (tokens.length == 3){
            deckBuffer.push({
              card_id: null,
              deck_id: null,
              front: tokens[1],
              back: tokens[2],
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
              front: tokens[1],
              back: "",
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
              front: tokens[1],
              back: tokens[2],
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
    <div className="m-10 h-fit p-4 rounded-md border-2 border-green-400">
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
          <div className="card-img  flex justify-center items-center">
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
            <div className="mt-10 mb-10">
              <CardForm card={card} setCard={setCard} />
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
        <div className="h-full w-full">
          <BatchCreationTab  onAdd={handleBatchAdd}/>
        </div>
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
