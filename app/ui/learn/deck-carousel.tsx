import { Deck as DeckType } from "@/app/lib/definitions";
import Deck from "../deck/deck";
import clsx from "clsx";
import { useState } from "react";

interface DeckCarouselProps {
    filteredDecks: DeckType[];
    setFilteredDecks: React.Dispatch<React.SetStateAction<DeckType[]>>; 
    myDecks: DeckType[];
}
export default function DeckCarousel(props : DeckCarouselProps){
    const [selected, setSelected] = useState<boolean[]>(new Array(props.myDecks.length).fill(false));
    return(
        <div className=" grid gap-6 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-7 mx-10 justify-center items-center">

            {props.myDecks.map((deck, index) => {
                return(
                    <div className={clsx('h-fit w-fit',{'shadow-lg shadow-teal-300':selected[index]})} 
                        onClick={()=>{
                        if (!selected[index]){
                            setSelected(prevSelected => prevSelected.map((item, idx) => idx === index ? true : item));
                            props.setFilteredDecks((prev) => [...prev, deck]);
                        }
                        else{
                            setSelected(prevSelected => prevSelected.map((item, idx) => idx === index ? false : item));
                            props.setFilteredDecks((prev) => prev.filter((item)=> item != deck));
                        }
                        



                    }} key={index}>
                        <Deck deck={deck}/>
                    </div>
                );
            })}
        </div>

    );
}