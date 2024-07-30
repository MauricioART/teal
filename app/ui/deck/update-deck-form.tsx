import DeckIcon from "./deck-icon";

export default function UpdateDeck(){
    return(
        <div className="grid grid-cols-1 grid-rows-3 content-center h-full justify-items-center items-center px-1">
            <div className=" row-span-1">
                <DeckIcon selectable={false}/>
            </div>
            <form action="" className="p-1 row-span-2 self-start">
                <label htmlFor="">Title</label>
                <input type="text" name="title" id="title" className=" pl-2  border-teal-500 border-dotted rounded-md w-full focus:border"/>
                <label htmlFor="">Description</label>
                <textarea name="description" id="description" rows={12}  className="p-2 border-teal-500 border-dotted  focus:border rounded-md w-full"></textarea>
            </form>
        </div>
    );
}