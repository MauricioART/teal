'use client';
import { useState, Suspense, ChangeEvent} from "react";
import Card from "@/app/ui/learn/card";
import Image from "next/image";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";


export default  function Page() {

  const adverse = "Adverse";
  const reverse = "Reverse";
  let cardsCount = 0;

  const [up, setUp] = useState(false);
  const [right, setRight] = useState(false);  
  const [down, setDown] = useState(false);
  const [left, setLeft] = useState(false);
  const [enableArrowBtns,setEnableArrowBtns] = useState(false);

  const upArrowBtnClasses = clsx(
    'absolute w-auto flex flex-col items-center top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 ',
    {
      'animateFadeIn': enableArrowBtns,
    }
  );
  const downArrowBtnClasses = clsx(
    'absolute w-auto flex flex-col items-center bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 opacity-0',
    {
      'animateFadeIn': enableArrowBtns,
    }
  );
  const leftArrowBtnClasses = clsx(
    'absolute w-auto flex flex-col items-center left-1/4 top-1/2 transform translate-x-1/3 -translate-y-1/2 opacity-0',
    {
      'animateFadeIn': enableArrowBtns,
    }
  );
  const rightArrowBtnClasses = clsx(
    'absolute w-auto flex flex-col items-center right-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0',
    {
      'animateFadeIn': enableArrowBtns,
    }
  );

  function handleClickUp(){
    setUp(true);
    setEnableArrowBtns(false);
  }
  function handleClickDown(){
    setDown(true);
    setEnableArrowBtns(false);
  }
  function handleClickLeft(){
    setLeft(true);
    setEnableArrowBtns(false);
  }
  function handleClickRight(){
    setRight(true);
    setEnableArrowBtns(false);
  }
  
  return (
    <main className="flex h-full px-0">
      <div className="flex justify-center items-center w-4/5 h-full relative">
        <div className={upArrowBtnClasses}  onClick={handleClickUp}>
          <ArrowUpIcon className="w-8"/><p>Normal</p>
        </div>
        <div className={rightArrowBtnClasses} onClick={handleClickRight}>
          <ArrowRightIcon className="w-8"/> <p>Hard</p>
        </div>
        <div className={leftArrowBtnClasses} onClick={handleClickLeft}>
          <ArrowLeftIcon className="w-8"/> <p>easy</p>
        </div>
        <div className={downArrowBtnClasses} onClick={handleClickDown}>
          <ArrowDownIcon className="w-8"/> <p>Challenging</p>
        </div>
        
        <Card key={cardsCount++} question={adverse} answer={"Existen dos tipos principales de células: las células procariotas y las células eucariotas. Las células procariotas."} options={["jhduiewewe","dfnuief","fdsneufis","sfesfsef"]} cardType={1} up={up} right={right} down={down} left={left} setEnableArrowBtns={setEnableArrowBtns}/>

      </div>
      <div className="w-1/5 h-full ">
      </div>
    </main>
  );
}
