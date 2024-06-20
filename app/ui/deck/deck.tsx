import DeckIcon from "./deck-icon";
import { Deck as deckType} from "@/app/lib/definitions";
import { fetchNumberOfCards } from "@/app/lib/data";

interface deckProps{
    deck : deckType;
}

export default  function Deck(props: deckProps){
    const deck = props.deck;
    if (deck.coverImage != null){
        const url = URL.createObjectURL(deck.coverImage);
        console.log(url);
        return (
            <div className="flex flex-col items-center m-5">
                <DeckIcon imageUrl={url}/>
                <p>{deck.name}</p>
                <p>{0} Cards</p>
                <p>Score: {deck.score}   Used: {deck.used}</p>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col items-center m-5">
                <DeckIcon />
                <p>{deck.name}</p>
                <p>{0} Cards</p>
                <p>Score: {deck.score}   Used: {deck.used}</p>
            </div>
        );
    }
   
}