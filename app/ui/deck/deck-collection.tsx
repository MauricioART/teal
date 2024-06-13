'use client';
import DeckIcon from "./deck-icon";
import AddDeckIcon from "./add-deck-icon";
import Deck from "./deck";
import { Deck as decktype } from "@/app/lib/definitions";
import Link from "next/link";


interface DeckCollectionProps {
    decks: decktype[];
}


export default function DeckCollection( props: DeckCollectionProps ){
    let myDecks = props.decks;

    return(
        <div className=" flex flex-wrap">

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