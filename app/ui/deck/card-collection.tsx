"use client";
import { Card } from "@/app/lib/definitions";
import Link from "next/link";
import AddCardIcon from "./add-card-icon";
import CardIcon from "./card-icon";
import Button from "../button";

interface cardsProps{
    add: boolean;
    deck_id: string | null;
    cards: Card[];
}

export default function CardCollection(props: cardsProps){
    let cards = props.cards;

    function handleClick(cardId: number){

    }
    
    return(
        <div className=" flex flex-wrap">

            {cards.map((card, index) => {
                if (props.add) {
                return(
                    <button key={index} onClick={()=>{handleClick(index)}}><CardIcon key={index} id={`${index}`}/></button>);
                }
                else{
                    return (
                        <h1>Hi</h1>
                    );
                }
            })}
            {  props.add &&
            <div className="flex flex-col items-center m-10"> 
                <Link key={1} href={`/learn/decks/${props.deck_id}/new`}>
                    <AddCardIcon />
                </Link>
            </div>}
            
        </div>
    );
}