import DeckIcon from "./deck-icon";
import { Deck as deckType} from "@/app/lib/definitions";
import { fetchNumberOfCards } from "@/app/lib/data";

interface deckProps{
    deck : deckType;
}

export default async function Deck(props: deckProps){
    const deck = props.deck;
    const numberOfCards = await fetchNumberOfCards(deck.deck_id);
    return (
        <div className="flex flex-col items-center m-5">
            <DeckIcon />
            <p>{deck.name}</p>
            <p>{numberOfCards} Cards</p>
            <p>Score: {deck.score}   Used: {deck.used}</p>
        </div>
    );
}