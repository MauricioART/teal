'use client';
import DeckIcon from "./deck-icon";
import AddDeckIcon from "./add-deck-icon";
import Deck from "./deck";
import { Deck as decktype } from "@/app/lib/definitions";
import Link from "next/link";
import { Rating } from "@mui/material";


interface DeckCollectionProps {
    decks: decktype[];
}


export default function DeckCollection( props: DeckCollectionProps ){
    let myDecks = props.decks;

    return(
        <div className=" grid gap-6 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-7 mx-10">

            {myDecks.map((deck, index) => {
                return(
                <Link key={index} href={`/learn/decks/${deck.deck_id}/edit`}>
                    <Deck key={index} deck={deck}/>
                </Link>);
            })}
            
            <div className="flex flex-col items-center m-5"> 
                <Link href="/learn/decks/create">
                    <AddDeckIcon />
                </Link>
            </div>
        </div>
    );
}