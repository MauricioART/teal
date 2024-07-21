import CreateDeckStepper from "@/app/ui/deck/create-deck-stepper";
import { auth } from "@/auth";
import Breadcrumbs from "@/app/ui/breadcrumbs";


export default async function Page(){
    const session = await auth();
    
    if (!session?.user) return null;

    const user_id = session.user.id;

    if (user_id != undefined){
        return(
            <div className="h-full overflow-hidden flex flex-col">
                <div className="h-fit w-fit">
                    <Breadcrumbs breadcrumbs={[
                        { label: 'Learn', href: '/learn/' },
                        {
                            label: 'Decks',
                            href: `/learn/decks/`,
                            active: false,
                        },
                        { label: 'Create',href: `learn/decks/create`, active: true},
                    ]} />
                </div>
                <div className="h-full w-full">
                    <CreateDeckStepper user_id={user_id}/>
                </div>
            </div>
        );    
    }
}