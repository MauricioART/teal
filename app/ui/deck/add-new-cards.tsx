'use client';
import { Button } from "@mui/material";
import NewCardForm from "./create-card-form";
import { useState } from "react";
import { Card } from "@/app/lib/definitions";
import { createCard } from "@/app/lib/actions";

interface componentProps{
    deckId: string,
}
export default function AddNewCards(props : componentProps){
    const [deck, setDeck] = useState<Card[]>([]);
    const handleSubmit = async () => {
        if (props.deckId){
          deck.map(async (card, index)=>{
            await createCard(props.deckId,card, `/learn/decks/${props.deckId}/edit`);
          });
          
        }
        setDeck([]);
    };
    return(
        <div className="flex flex-col w-full h-full">
            <NewCardForm deck={deck} setDeck={setDeck} />
            <Button className="self-end " color="primary" onClick={handleSubmit}> Submit</Button>
        </div>
    );
}