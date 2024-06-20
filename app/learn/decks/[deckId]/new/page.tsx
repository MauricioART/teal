import NewCardForm from "@/app/ui/deck/create-card-form";
import Image from "next/image";

export default function Page({ params }: { params: { deckId: string } }){
    const id = params.deckId;
    const width = 190;
    return(
        <div className="flex justify-evenly items-center h-5/6">
            <NewCardForm/>
        </div>
    );
}