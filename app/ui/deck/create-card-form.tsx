import { useState } from "react";
import { createCard } from "@/app/lib/actions";

export default function NewCardForm (){
    //const [cardType, setType] = useState<0 | 1 | 2>(0);

    return(
        <form action={createCard}>
            <div className="flex  flex-col m-1 h-full p-10 bg-slate-50 rounded-md">
                <div className="flex flex-col items-start border border-teal-200 w-2/3 rounded">
                    <label htmlFor="">Question/Front</label>
                    <input type="text" className="focus:outline-none focus:border-none"/>
                </div>
                <div className="flex flex-col border border-teal-200 w-2/3 items-start rounded">
                    <label htmlFor="">Answer/Back</label>
                    <input type="text" className="focus:outline-none focus:border-none"/>
                </div>

            </div>
        </form>
    );
}