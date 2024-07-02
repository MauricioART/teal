"use client";
import { Fragment, useState } from "react";
import { Card } from "@/app/lib/definitions";
import Link from "next/link";
import AddCardIcon from "./add-card-icon";
import CardIcon from "./card-icon";
import NewCardForm from "./create-card-form";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateCard } from "@/app/lib/actions";
import { Switch } from "@mui/material";

interface cardsProps{
    add: boolean;
    deck_id: string | null;
    cards: Card[];
}

export default function CardCollection(props: cardsProps){
    const [deck, setDeck] = useState<Card[]>(props.cards);
    const [open, setOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState<Card|null>(null);
    const [currentIndex, setCurrentIndex] = useState<number|null>(null);
    const [checked, setChecked] = useState(true);
    
    
    function handleClick(card: Card ){
        setCurrentCard(card);
        setOpen(true);
    }
    
    const handleClose = () => {
        setOpen(false);
    };

    const  handleButtonClick = async ( ) => {
        if (currentCard != null && currentIndex != null){
            const response = await updateCard(currentCard);
            let deckBuffer = deck;
            deckBuffer[currentIndex] = currentCard;
            setDeck(deckBuffer);
    }
        setOpen(false);
    };

    const handleOptionChange = (index: number, value: string) => {
        if (currentCard != null && currentCard.options != undefined){
        const newOptions = [...currentCard.options];
        newOptions[index] = value;
        setCurrentCard({ ...currentCard, options: newOptions });
      }
      };
    
    
    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setChecked(event.target.checked);
        if (currentCard != null)
            setCurrentCard({ ...currentCard, answer: event.target.checked ? 0 : 1 });
    }
    return(
        <Fragment>
        <div className="grid sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-7 mx-10">
            {deck.map((card, index) => {
                return (<button key={index}  className="justify-self-center" onClick={()=>{
                    handleClick(card);
                    setCurrentIndex(index);
                }}><CardIcon key={index} id={`${index}`}/></button>);
            })}

            {  props.add &&
            <div className="flex flex-col items-center m-10"> 
                <Link key={1} href={`/learn/decks/${props.deck_id}/new`}>
                    <AddCardIcon />
                </Link>
            </div>}
            
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="p-5" 
        maxWidth="xl">
        <DialogTitle id="alert-dialog-title">
          {""}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form >
                { currentCard != null && currentCard?.card_type === 0 &&  (
                    <div className="flex justify-around items-center h-full p-10">
                    <div className="flex flex-col items-start">
                        <label className="ml-2"> Question</label>
                        <textarea
                        id="question"
                        name="question"
                        placeholder="QUESTION"
                        rows={4}
                        cols={45}
                        className="focus:outline-none focus:border-none p-2 rounded-lg border-teal-500 border-2"
                        value={currentCard.question}
                        onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
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
                        className="focus:outline-none focus:border-none p-2 rounded-lg border-teal-500 border-2"
                        value={currentCard.answer}
                        onChange={(event) => setCurrentCard({ ...currentCard, answer: event.target.value })}
                        required
                        />
                    </div>
                    </div>
                )}
                {currentCard != null && currentCard?.card_type === 1 && (
                    <div className="flex justify-around items-center h-full ">
                    <div className="flex flex-col">
                        <label htmlFor="">Question</label>
                        <textarea
                        id="question"
                        name="question"
                        placeholder="QUESTION"
                        rows={6}
                        cols={50}
                        className="focus:outline-none focus:border-teal-400 p-2 rounded-lg border-teal-500 border-2"
                        value={currentCard.question}
                        onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
                        required
                        />
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        {currentCard.options && currentCard.options.map((option, index) => (
                        <>
                        <label htmlFor="" className="">Option {index + 1}</label>
                        <input
                            key={index}
                            type="text"
                            placeholder={index === 0 ? "CORRECT ANSWER" : "INCORRECT ANSWER"}
                            value={option}
                            className="pl-1 border-2 rounded-lg focus:border-teal-400 border-teal-500 mb-1 w-96"
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        /></>
                        ))}
                    </div>
                    </div>
                )}
                {currentCard != null && currentCard?.card_type === 2 && (
                    <div className="flex flex-col items-center h-full px-5 mx-5">
                    <textarea
                        id="question"
                        name="question"
                        placeholder="QUESTION"
                        rows={6}
                        cols={60}
                        className="focus:outline-none focus:border-teal-400 p-2 rounded-lg border-teal-500 border-2"
                        value={currentCard.question}
                        onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
                        required
                    />
                    <Switch className="self-end" checked={checked}  onChange={handleChecked} color="success">
                    </Switch>
                    </div>
                )}  
      
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleButtonClick} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
        </Fragment>
    );
}