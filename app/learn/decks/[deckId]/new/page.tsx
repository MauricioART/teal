import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchDeck } from "@/app/lib/data";
import AddNewCards from "@/app/ui/deck/add-new-cards";

interface pageProps{
    deckId: string
}
export default async function Page({ params }: { params: { deckId: string } }){
    const deckId = params.deckId;
    const deck = await fetchDeck(deckId);
    console.log(deck);
    
    return(
        <div className="flex flex-col justify-evenly items-center">
            <div className="self-start">
                <Breadcrumbs           
                breadcrumbs={[
                    { label: 'Learn', href: '/learn/' },
                    {
                        label: 'Decks',
                        href: `/learn/decks/`,
                        active: false,
                    },
                    { label: `${deck[0].name}`, href: `/learn/decks/${deckId}/edit`, active: false},
                    { label: 'New', href: `/learn/decks/${deckId}/new`, active: true},
                ]} />
            </div>
            <div className="h-full w-full m-3 p-2">
                <AddNewCards deckId={deckId}/>
            </div>
        </div>
    );
}