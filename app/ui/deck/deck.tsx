import DeckIcon from "./deck-icon";
import { Deck as deckType} from "@/app/lib/definitions";
import { fetchNumberOfCards } from "@/app/lib/data";
import { Rating, Tooltip } from "@mui/material";

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
                <DeckIcon imageUrl={url} selectable={true}/>
                <Tooltip title={deck.name}>
                    <p className="w-40 whitespace-nowrap justify-self-center overflow-hidden text-ellipsis text-center">{deck.name}</p>
                </Tooltip>
                <p>Copied: {deck.used}</p>
                <Rating/>
            </div>
        );
    }
    else {
        return (
            <div className="flex flex-col items-center m-5 max-w-40">
                <DeckIcon imageUrl="" selectable={true}/>
                <Tooltip title={deck.name}>
                    <p className="w-40 whitespace-nowrap justify-self-center overflow-hidden text-ellipsis text-center">{deck.name}</p>
                </Tooltip>
                <p>Copied: {deck.used}</p>
                <Rating/>
            </div>
        );
    }
   
}