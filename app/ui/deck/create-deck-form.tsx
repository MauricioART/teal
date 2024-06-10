import { createDeck } from "@/app/lib/actions";
import Button from "../button";
import DeckIcon from "./deck-icon";
import { Deck as decktype } from "@/app/lib/definitions";
import { useState } from "react";
import Link from "next/link";

export default function Form (){
    return(
        <form action={createDeck} >
            <div className="flex  flex-col m-1 h-full p-10 bg-slate-50 rounded-md">
                <div>
                    <h1> Create </h1>
                </div>

                <div className="flex">
                    <div className=" w-5/6">
                        <div className="flex flex-col w-2/3 h-16 border-teal-200 border-2 mb-8 mt-8 rounded ">
                            <label htmlFor="name">Title (Mandatory)</label>
                            <input type="text" id="name" name="name" className=" border-white focus:outline-none focus:border-none " required />
                        </div>
                        <div className=" flex flex-col w-2/3 h-28 border-2 border-teal-200 mb-8 rounded ">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" rows={4} cols={50} className="focus:outline-none focus:border-none" required></textarea>
                        </div>
                        
                    </div>
                    <div>
                        <DeckIcon />
                    </div>
                </div>
                    
                <div >
                    <label htmlFor="image">Thumbnail:</label>
                    <input type="file" id="image" name="image" accept="image/*" title=""  />
                </div>
 
                
                <div className="flex self-end">
                    <Link
                    href="/learn/decks"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >Cancel
                    </Link>
                    <Button type="submit" className="flex self-center">Submit</Button>
                </div>
            </div>       
        </form>
    );
}