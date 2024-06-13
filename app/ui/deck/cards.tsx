import { Card } from "@/app/lib/definitions";
import Link from "next/link";
import AddCardIcon from "./add-card-icon";
import CardIcon from "./add-card-icon";

interface cardsProps{
    deck_id: number;
    cards: Card[];
}

export default function Cards(props: cardsProps){
    let cards = props.cards;

    return(
        <div className=" flex flex-wrap">

            {cards.map((card, index) => {
                return(
                <Link key={index} href={`/learn/decks/${props.deck_id}/edit/${index}/edit`}>
                    <CardIcon />
                </Link>);
            })}
            
            <div className="flex flex-col items-center m-10"> 
                <Link href={`/learn/decks/${props.deck_id}/new`}>
                    <AddCardIcon />
                </Link>
            </div>
            
        </div>
    );
}