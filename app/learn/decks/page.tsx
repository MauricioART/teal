import { Deck } from "@/app/lib/definitions";
import DeckCollection from "@/app/ui/deck/deck-collection";
import { fetchDecks } from "@/app/lib/data";

interface pageProps{
    user_id: number;
}

export default async function Page (props : pageProps){

    let myDecks: Deck[] = await fetchDecks(1);

    return (
        <div className=" mx-10">
            <DeckCollection decks={myDecks}/>
        </div>
    );
}