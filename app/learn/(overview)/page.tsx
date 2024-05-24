'use client';
import { useState, Suspense, ChangeEvent, useEffect} from "react";
import Card from "@/app/ui/learn/card";
import Image from "next/image";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import {Card as cardType} from "@/app/lib/definitions";


export default  function Page() {

  const adverse = "¿Qué tipos de celulas existen?";
  let cardsCount = 0;

  const [up, setUp] = useState(false);
  const [right, setRight] = useState(false);  
  const [down, setDown] = useState(false);
  const [left, setLeft] = useState(false);
  const [enableArrowBtns,setEnableArrowBtns] = useState(false);

  const upArrowBtnClasses = clsx(
    ' w-auto flex flex-col items-center opacity-0 ',
    {
      'animateFadeIn': enableArrowBtns,
    }
  );
  const downArrowBtnClasses = clsx(
    ' w-auto flex flex-col items-center opacity-0',
    {
      'animateFadeIn': enableArrowBtns,
    }
  );
  const leftArrowBtnClasses = clsx(
    ' w-auto flex flex-col items-center opacity-0',
    {
      'animateFadeIn': enableArrowBtns,
    }
  );
  const rightArrowBtnClasses = clsx(
    ' w-auto flex flex-col items-center opacity-0',
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
      <div className="flex w-4/5 h-full">

        <div className="flex justify-end items-center flex-grow">
          <div className={leftArrowBtnClasses} onClick={handleClickLeft}>
            <ArrowLeftIcon className="w-8"/> <p>easy</p>
          </div>
        </div>
        <div className="flex flex-col items-center basis-auto flex-grow flex-shrink">
          <div className={upArrowBtnClasses}  onClick={handleClickUp}>
            <ArrowUpIcon className="w-8"/><p>Normal</p>
          </div>
          <Card key={cardsCount++} question={adverse} answer={"Existen dos tipos principales de células: las células procariotas y las células eucariotas. Las células procariotas."} options={["jhduiewewe","dfnuief","fdsneufis","sfesfsef"]} cardType={2} up={up} right={right} down={down} left={left} setEnableArrowBtns={setEnableArrowBtns}/>
          <div className={downArrowBtnClasses} onClick={handleClickDown}>
            <ArrowDownIcon className="w-8"/> <p>Challenging</p>
          </div>
        </div>
        <div className="flex justify-start items-center flex-grow">  
          <div className={rightArrowBtnClasses} onClick={handleClickRight}>
            <ArrowRightIcon className="w-8"/> <p>Hard</p>
          </div>
        </div>  
      </div>
      <div className="w-1/5 h-full ">
      </div>
    </main>
  );
}
