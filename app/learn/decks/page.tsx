import { Deck } from "@/app/lib/definitions";
import DeckCollection from "@/app/ui/deck/deck-collection";
import { fetchDecks } from "@/app/lib/data";
import { auth } from "@/auth";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export default async function Page (){
    const session = await auth()
    
    if (!session?.user) return null;
    
    let myDecks: Deck[] = [];
    
    if (session.user.id != undefined){
        console.log(session.user.id);
        myDecks = await fetchDecks(session.user.id);
    }

    return (
        <div className=" mx-10">
            <Breadcrumbs breadcrumbs={[
          { label: 'Learn', href: '/learn/' },
          {
            label: 'Decks',
            href: `/learn/decks/`,
            active: true,
          },
        ]}/>
            <DeckCollection decks={myDecks}/>
        </div>
    );
}