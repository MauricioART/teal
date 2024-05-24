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
  const [card, setCard] = useState<cardType | null>(null)

  
 const cards: cardType[] = [
  {
      question: "What is the capital of France?",
      answer: 0,
      options: ["Paris", "Berlin", "Rome", "Madrid"],
      cardType: 1,
      priority: 1
  },
  {
      question: "What is 2 + 2?",
      answer: 1,
      options: ["3", "4", "5", "6"],
      cardType: 1,
      priority: 2
  },
  {
      question: "Is the earth round?",
      answer: 0,
      options: ["True", "False"],
      cardType: 0,
      priority: 3
  },
  {
      question: "What is the chemical symbol for water?",
      answer: 0,
      options: ["H2O", "CO2", "O2", "H2"],
      cardType: 1,
      priority: 4
  },
  {
      question: "Solve the equation: x + 3 = 5. What is x?",
      answer: 1,
      options: ["1", "2", "3", "4"],
      cardType: 1,
      priority: 5
  }
];
useEffect(()=>{
  setCard(cards[3]);
},[]);

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
  
  if (!card) {
    return <div>Loading...</div>; // Puedes mostrar un mensaje de carga mientras card es null
  }
  else{
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
          <Card key={cardsCount++} card={card!} up={up} right={right} down={down} left={left} setEnableArrowBtns={setEnableArrowBtns}/>
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
}
