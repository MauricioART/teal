"use client";
import { Fragment, useState } from "react";
import { Card } from "@/app/lib/definitions";
import Link from "next/link";
import AddCardIcon from "./add-card-icon";
import CardIcon from "./card-icon";
import { deleteCard, updateCard } from "@/app/lib/actions";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import UpdateCardCarousel from "./update-card-carousel";

interface cardsProps{
    add: boolean;
    deck_id: string | null;
    cards: Card[];
}

export default function CardCollection(props: cardsProps){
    const [deck, setDeck] = useState<Card[]>(props.cards);
    const [open, setOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState<Card>();
    const [currentIndex, setCurrentIndex] = useState<number>(0);
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
    const handleDeleteCard = async (index: number) => {
        const deletedCard = deck.at(index);
        const newDeck = deck.filter( (card) => card !== deletedCard);
        setDeck(newDeck);
        if (deletedCard?.card_id != null && deletedCard.card_id != undefined
            && deletedCard.deck_id != null
        ){
            await deleteCard(deletedCard?.card_id, deletedCard.deck_id);
        }

    }
    
    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setChecked(event.target.checked);
        if (currentCard != null)
            setCurrentCard({ ...currentCard, answer: event.target.checked ? 0 : 1 });
    }
    return(
        <Fragment>
        <div className="grid sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-7 mx-10 my-5">
            {deck.map((card, index) => {
                return (
                <button key={index}  className="justify-self-center relative w-fit h-fit" 
                onClick={(event)=>{
                    handleClick(card);
                    setCurrentIndex(index);
                    console.log(index);
                }}>
                    <CardIcon  id={`${index}`} className="hover:shadow-teal-600 hover:shadow-md"/>
                    <DeleteOutlineIcon 
                        className="h-8 w-8 p-1 absolute top-5 right-5 rounded-full hover:bg-gray-200 " 
                        key={index}
                        onClick={async (e) =>  {
                            e.stopPropagation();
                            await handleDeleteCard(index);
                        }}
                    />
                </button>);
            })}

            {  props.add &&
            <div className=""> 
                <Link key={1} href={`/learn/decks/${props.deck_id}/new`}>
                    <AddCardIcon />
                </Link>
            </div>}
            
        </div>
        <UpdateCardCarousel 
            deck={deck}
            setDeck={setDeck}
            open={open}
            handleClose={setOpen}
            index={currentIndex != null ? currentIndex : 0}
            setIndex={setCurrentIndex}
        />
        </Fragment>
    );
}