import  NewDeckForm from "@/app/ui/deck/create-deck-form";
import CreateDeckStepper from "@/app/ui/deck/create-deck-stepper";
import { auth } from "@/auth";


export default async function Page(){
    const session = await auth();
    
    if (!session?.user) return null;

    const user_id = session.user.id;

    if (user_id != undefined){
        return(
            <div className="h-full overflow-hidden">
            <CreateDeckStepper user_id={user_id}/>
            </div>
        );    
    }
}