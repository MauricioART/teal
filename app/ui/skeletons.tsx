import AddCardIcon from "./deck/add-card-icon";
import AddDeckIcon from "./deck/add-deck-icon";
import DeckIcon from "./deck/deck-icon";
import { Rating } from "@mui/material";

// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function DeckSkeleton() {
  return (
    
    <div className={`${shimmer} flex flex-col items-center m-5`}>
      <div className="flex flex-col items-center overflow-ellipsis">

        <div className=" w-[150px] h-[185px] bg-gray-300 rounded-lg border-gray-300 border"/>
        <div className=" w-[150px] h-5 rounded bg-gray-100 mt-2"/>
        <div className=" w-[150px] h-5 mt-1 flex justify-between">
          <div className=" w-6 h-full rounded bg-gray-100 "/>
          <div className=" w-28 h-full rounded bg-gray-100 "/>
        </div>
        <div className=" w-[150px] h-5 rounded bg-gray-100 mt-1"/>
        
      </div>
    </div>
  );
}


export function CardSkeleton() {
  return (
    <div
      className="w-[128.33px] h-[174.58px] bg-gray-300  m-2 rounded-md"   >
    </div>
  );
}

export  function DeckCollectionSkeleton() {
  return (
    <div className="flex flex-col mx-10">
      <div
        className={`${shimmer} relative mt-5 ml-[10px] mb-3 h-6 w-36 overflow-hidden self-start rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-7 ">
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
        <DeckSkeleton />
      </div>
    </div>
  );
}

export  function DeckEditSkeleton() {
  return (
    <div className="h-full w-full">
      <div
        className={`${shimmer} relative  mt-5 ml-[50px] block  h-6 w-48 overflow-hidden self-start rounded-md bg-gray-100`}
      />
      <div className='deck-edit-div h-full w-full overflow-hidden  '>
        <div className=' col-start-1 col-end-2 justify-self-center place-self-center border-2 border-teal-400 rounded-md shadow-xl p-2'>
          <div className="w-[150px] h-[202.5px] p-2  rounded-lg"> 
            <div className="h-full w-full bg-gray-300 rounded-lg"></div>
          </div>
        </div>
        <div className=' col-start-1 row-start-2 row-span-2 pl-6'>
          <div className="bg-gray-300 w-36 h-5 mb-2 rounded"/>        
          <div className="bg-gray-300 w-60 h-5 mb-2 rounded"/>        
          <div className="bg-gray-300 w-60 h-5 mb-2 rounded"/>
          <div className="bg-gray-300 w-60 h-5 mb-2 rounded"/>

        </div>
        <div className='col-start-2 row-start-1 row-end-5  h-full w-full'>
        <div className="grid sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-7 mx-10 my-5">
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
        </div>
        </div>
      </div>
    </div>
  );
}

export function CreateDeckSkeleton(){
  return(
    <div className="h-full overflow-hidden flex flex-col">
      <div className="h-fit w-fit">
        <div className={`${shimmer} relative  mt-5 ml-[50px] block  h-6 w-52 overflow-hidden self-start rounded-md bg-gray-100`}/>
      </div>
        <div className="h-full w-full">
          <div className='grid grid-cols-1 grid-rows-5 items-center m-2 p-2 w-full h-full justify-around'>
            <div className='row-span-4 '>
              <div className="flex flex-col m-10 h-[400px] p-10 bg-gray-200 rounded-md border-2 border-dotted border-gray-400">
                  <div className="h-5 w-20 bg-gray-300 rounded-lg"/>
                  <div className="flex ">
              </div>
            </div>
          </div>
            <div className='h-full w-full grid grid-rows-2 grid-cols-3 items-center'>
              <div className="col-span-3 col-start-1 px-7 row-start-1 ">
                <div className="bg-gray-300 h-8  rounded-lg"/>
              </div>
              <div className="h-5 w-14 row-start-2 ml-7 bg-gray-300  rounded-lg mb-3"/>
              <div className="h-5 w-14 row-start-2 mr-7 bg-gray-300 col-start-3 mb-3 place-self-end self-center  rounded-lg"/>
            </div>
          </div>
      </div>
    </div>
  );
}

