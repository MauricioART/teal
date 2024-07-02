import DeckIcon from "./deck-icon";
import { Deck as deckType} from "@/app/lib/definitions";
import { fetchNumberOfCards } from "@/app/lib/data";
import { Rating } from "@mui/material";

interface deckProps{
    deck : deckType;
}

export default  function Deck(props: deckProps){
    const deck = props.deck;
    if (deck.coverImage != null){
        const url = URL.createObjectURL(deck.coverImage);
        console.log(url);
        return (
            <div className="flex flex-col items-center m-5 max-w-40">
                <DeckIcon imageUrl={url}/>
                <p className="max-w-40 overflow-hidden">{deck.name}</p>
                <p>Saved: {deck.used}</p>
                <Rating/>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col items-center m-5 max-w-40">
                <DeckIcon />
                <p className="max-w-40 overflow-hidden">{deck.name}</p>
                <p>Saved: {deck.used}</p>
                <Rating/>
            </div>
        );
    }
   
}