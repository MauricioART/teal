"use client";
import { useState, Suspense, ChangeEvent} from "react";
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

  function handleClickUp(){
    setUp(true);
  }
  function handleClickDown(){
    setDown(true);
  }
  function handleClickLeft(){
    setLeft(true);
  }
  function handleClickRight(){
    setRight(true);
  }
  
  return (
    <main className="flex h-full px-0">
      <div className="flex justify-center items-center w-4/5 h-full relative">
        <div className="absolute w-auto flex flex-col items-center top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " onClick={handleClickUp}>
          <ArrowUpIcon className="w-8"/><p>Normal</p>
        </div>
        <div className="absolute w-auto flex flex-col items-center right-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={handleClickRight}>
          <ArrowRightIcon className="w-8"/> <p>Hard</p>
        </div>
        <div className="absolute w-auto flex flex-col items-center left-1/4 top-1/2 transform translate-x-1/3 -translate-y-1/2 " onClick={handleClickLeft}>
          <ArrowLeftIcon className="w-8"/> <p>easy</p>
        </div>
        <div className="absolute w-auto flex flex-col items-center  bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4" onClick={handleClickDown}>
          <ArrowDownIcon className="w-8"/> <p>Challenging</p>
        </div>
        
        <Card question={adverse} answer={["jhduiewewe","dfnuief","fdsneufis","sfesfsef"]} cardType={2} up={up} right={right} down={down} left={left}/>

      </div>
      <div className="w-1/5 h-full ">
      </div>
    </main>
  );
}
