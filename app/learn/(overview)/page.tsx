'use client';
import { useState, useEffect } from "react";
import Card from "@/app/ui/learn/card";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { Card as cardType } from "@/app/lib/definitions";


export default function Page() {
  const cards: cardType[] = [
    { question: "What is the capital of France?", answer: 0, options: ["Paris", "Berlin", "Rome", "Madrid"], cardType: 1, priority: 1 },
    { question: "Is the earth round?", answer: 0, options: ["True", "False"], cardType: 0, priority: 3 },
    { question: "What is 2 + 2?", answer: 1, options: ["3", "4", "5", "6"], cardType: 1, priority: 2 },
    { question: "What is the chemical symbol for water?", answer: 0, options: ["H2O", "CO2", "O2", "H2"], cardType: 1, priority: 4 },
    { question: "Solve the equation: x + 3 = 5. What is x?", answer: 1, options: ["1", "2", "3", "4"], cardType: 1, priority: 5 }
  ];

  const [cardIndex, setCardIndex] = useState(0);
  const [enableArrowBtns, setEnableArrowBtns] = useState(false);
  const [direction, setDirection] = useState< "up" | "down" | "left" | "right" | null>(null);

//  useEffect(() => {
//    setEnableArrowBtns(true);
//  }, []);

  const handleArrowClick = (direction: "up" | "down" | "left" | "right" | null) => {
    if (enableArrowBtns && cardIndex < cards.length - 1) {
      setDirection(direction);
      setEnableArrowBtns(false);
      setCardIndex(cardIndex + 1);
    }
  };

  const arrowBtnClasses = (direction: "up" | "down" | "left" | "right" | null) => clsx('w-auto flex flex-col items-center opacity-0', {
    'animateFadeIn': enableArrowBtns,
  });

  const currentCard = cards[cardIndex];

  return (
    <main className="flex h-full px-0">
      <div className="flex w-4/5 h-full overflow-hidden">
        <div className="flex justify-end items-center flex-grow">
          <div className={arrowBtnClasses('left')} onClick={() => handleArrowClick('left')}>
            <ArrowLeftIcon className="w-8" /> <p>easy</p>
          </div>
        </div>
        <div className="flex flex-col items-center basis-auto flex-grow flex-shrink">
          <div className={arrowBtnClasses('up')} onClick={() => handleArrowClick('up')}>
            <ArrowUpIcon className="w-8" /><p>Normal</p>
          </div>
          <Card key={cardIndex} card={currentCard} direction={direction} enableArrowBtns={enableArrowBtns} setEnableArrowBtns={setEnableArrowBtns} />
          <div className={arrowBtnClasses('down')} onClick={() => handleArrowClick('down')}>
            <ArrowDownIcon className="w-8" /> <p>Challenging</p>
          </div>
        </div>
        <div className="flex justify-start items-center flex-grow">
          <div className={arrowBtnClasses('right')} onClick={() => handleArrowClick('right')}>
            <ArrowRightIcon className="w-8" /> <p>Hard</p>
          </div>
        </div>
      </div>
      <div className="w-1/5 h-full "></div>
    </main>
  );
}
