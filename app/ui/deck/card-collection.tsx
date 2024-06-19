import { Card } from "@/app/lib/definitions";
import Link from "next/link";
import AddCardIcon from "./add-card-icon";
import CardIcon from "./add-card-icon";

interface cardsProps{
    add: boolean;
    deck_id: string | null;
    cards: Card[];
}

export default function CardCollection(props: cardsProps){
    let cards = props.cards;
    
    return(
        <div className=" flex flex-wrap">

            {cards.map((card, index) => {
                return(
                <Link key={index} href={`/learn/decks/${props.deck_id}/edit/${index}/edit`}>
                    <CardIcon />
                </Link>);
            })}
            {  props.add &&
            <div className="flex flex-col items-center m-10"> 
                <Link href={`/learn/decks/${props.deck_id}/new`}>
                    <AddCardIcon />
                </Link>
            </div>}
            
        </div>
    );
}