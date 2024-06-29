import  NewDeckForm from "@/app/ui/deck/create-deck-form";
import CreateDeckStepper from "@/app/ui/deck/create-deck-stepper";
import { auth } from "@/auth";
import Breadcrumbs from "@/app/ui/breadcrumbs";


export default async function Page(){
    const session = await auth();
    
    if (!session?.user) return null;

    const user_id = session.user.id;

    if (user_id != undefined){
        return(
            <div className=" ">
            <Breadcrumbs breadcrumbs={[
                { label: 'Learn', href: '/learn/' },
                {
                  label: 'Decks',
                  href: `/learn/decks/`,
                  active: false,
                },
                { label: 'Create',href: 'learn/decks/create', active: true},
            ]}/>
            <CreateDeckStepper user_id={user_id}/>
            </div>
        );    
    }
}