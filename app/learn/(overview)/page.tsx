"use client";
import { useState, Suspense } from "react";
import Card from "@/app/ui/learn/card";
import Image from "next/image";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/24/outline';


export default  function Page() {

  const adverse = "Adverse";
  const reverse = "Reverse";

  const [up, setUp] = useState(false);
  const [right, setRight] = useState(false);  
  const [down, setDown] = useState(false);
  const [left, setLeft] = useState(false);

  function handleClick(){
    console.log("I have been clicked.")
    setUp(true);
  }
  
  return (
    <main className="flex h-full px-0">
      <div className="flex justify-center items-center w-4/5 h-full relative">
        <div className="absolute w-8 top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={handleClick}>
          <ArrowUpIcon />easy
        </div>
        <div className="absolute w-8 right-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={handleClick}>
          <ArrowRightIcon /> Normal
        </div>
        <div className="absolute w-8 left-1/4 top-1/2 transform translate-x-1/3 -translate-y-1/2 " onClick={handleClick}>
          <ArrowLeftIcon /> Harder
        </div>
        <div className="absolute w-8 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4" onClick={handleClick}>
          <ArrowDownIcon /> Hard
        </div>
        
        <Card question={adverse} answer={["jhduiewewe","dfnuief","fdsneufis","sfesfsef"]} cardType={2} up={up} right={right} down={down} left={left}/>

      </div>
      <div className="w-1/5 h-full ">
      </div>
    </main>
  );
}
