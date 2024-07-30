'use client';
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
        <div className="grid gap-6 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 mx-10">
            {myDecks.map((deck, index) => {
                return(
                <div className="">
                    <Link key={index} href={`/learn/decks/${deck.deck_id}/edit`}>
                        <Deck key={index} deck={deck}/>
                    </Link>
                </div>);
            })}
            
            <div className="flex flex-col items-center m-5"> 
                <Link href="/learn/decks/create">
                    <AddDeckIcon />
                </Link>
            </div>
        </div>
    );
}