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
        <div className="flex flex-col flex-grow overflow-y-auto">
            <Breadcrumbs breadcrumbs={[
                { label: 'Learn', href: '/learn/' },
                {
                    label: 'Decks',
                    href: `/learn/decks/`,
                    active: true,
                },
            ]}/>
            {/*<div className="flex justify-center">
                <h1 className="">My Decks</h1>
            </div>*/}
            <DeckCollection decks={myDecks}/>
        </div>
    );
}
/*
<div className=" mx-10">
            
*/