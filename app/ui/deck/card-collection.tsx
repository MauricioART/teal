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
    return(
        <Fragment>
        <div className=" flex flex-wrap">

            {deck.map((card, index) => {
                return (<button key={index} onClick={()=>{
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
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form >
                { currentCard != null && currentCard?.card_type === 0 && (
                    <div className="flex justify-around items-center h-48 p-10">
                    <textarea
                        id="question"
                        name="question"
                        placeholder="QUESTION"
                        rows={4}
                        cols={50}
                        className="focus:outline-none focus:border-none p-2"
                        value={currentCard.question}
                        onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
                        required
                    />
                    <div className="flex flex-col">
                        <label>
                        <input type="radio" name="answer" value="True"
                            onChange={() => setCurrentCard({ ...currentCard, answer: 0 })}
                        />
                        True
                        </label>
                        <label>
                        <input type="radio" name="answer" value="False"
                            onChange={() => setCurrentCard({ ...currentCard, answer: 1 })}
                        />
                        False
                        </label>
                    </div>
                    </div>
                )}
                {currentCard != null && currentCard?.card_type === 1 && (
                    <div className="flex justify-around items-center h-48 p-10">
                    <textarea
                        id="question"
                        name="question"
                        placeholder="QUESTION"
                        rows={4}
                        cols={50}
                        className="focus:outline-none focus:border-none p-2"
                        value={currentCard.question}
                        onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
                        required
                    />
                    <div className="flex flex-col">
                        {currentCard.options && currentCard.options.map((option, index) => (
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
                {currentCard != null && currentCard?.card_type === 2 && (
                    <div className="flex justify-around items-center h-48 p-10">
                    <textarea
                        id="question"
                        name="question"
                        placeholder="QUESTION"
                        rows={4}
                        cols={50}
                        className="focus:outline-none focus:border-none p-2"
                        value={currentCard.question}
                        onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
                        required
                    />
                    <textarea
                        id="answer"
                        name="answer"
                        rows={4}
                        placeholder="ANSWER"
                        cols={50}
                        className="focus:outline-none focus:border-none p-2"
                        value={currentCard.answer}
                        onChange={(event) => setCurrentCard({ ...currentCard, answer: event.target.value })}
                        required
                    />
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