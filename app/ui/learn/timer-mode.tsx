import { useState, useEffect, useCallback } from "react";
import Card from "@/app/ui/learn/card";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import clsx from "clsx";
import { Card as cardType } from "@/app/lib/definitions";
import Timer from "./timer";

interface TimerModeProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  filteredCards: cardType[];
}

const TimerMode: React.FC<TimerModeProps> = ({ time, setTime, filteredCards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<cardType | null>(filteredCards[Math.floor(Math.random() * (filteredCards.length - 1))]);
  const [cardPriority, setCardPriority] = useState<number[]>(new Array(filteredCards.length).fill(50));
  const [enableArrowBtns, setEnableArrowBtns] = useState(false);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right" | null>(null);

  useEffect(() => {
    if (time === 0) {
      setCurrentCard(null);
    }
  }, [time]);

  const getNextCard = useCallback(() => {
    let cumulativeSum = [];
    let sum = 0;
    let nextCardIndex = 0;

    for (let weight of cardPriority) {
      sum += weight;
      cumulativeSum.push(sum);
    }

    do {
      const random = Math.random() * sum;
      for (let i = 0; i < cumulativeSum.length; i++) {
        if (random < cumulativeSum[i]) {
          nextCardIndex = i;
          break;
        }
      }
    } while (nextCardIndex === currentCardIndex);

    setCurrentCard(filteredCards[nextCardIndex]);
    setCurrentCardIndex(nextCardIndex);
  }, [cardPriority, filteredCards]);

  const handleArrowClick = useCallback((adjustment: number) => {
    setCardPriority((prev) => {
      const newPriorities = [...prev];
      newPriorities[currentCardIndex] = Math.min(Math.max(newPriorities[currentCardIndex] + adjustment, 1), 100);
      return newPriorities;
    });

    if (enableArrowBtns && time > 10) {
      getNextCard();
      setEnableArrowBtns(false);
      switch (adjustment) {
        case 0:
          setDirection('up');
          break;
        case 5:
          setDirection('left');
          break;
        case 10:
          setDirection('down');
          break;
        case -5:
          setDirection('right');
          break;
        default:
          break;
      }
    }
  }, [currentCardIndex, enableArrowBtns, time, getNextCard]);

  const arrowBtnClasses = clsx('w-auto flex flex-col items-center opacity-0', {
    'animateFadeIn': enableArrowBtns,
  });

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        handleArrowClick(0);
        break;
      case "ArrowDown":
        handleArrowClick(10);
        break;
      case "ArrowLeft":
        handleArrowClick(5);
        break;
      case "ArrowRight":
        handleArrowClick(-5);
        break;
      default:
        break;
    }
  }, [handleArrowClick]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <main className="flex h-full px-0 relative">
      <div className="absolute right-10 top-10">
        <Timer start={true} time={time} setTime={setTime} />
      </div>
      {currentCard && (
        <div className="flex w-full h-full overflow-hidden">
          <div className="flex justify-end items-center flex-grow">
            <div className={arrowBtnClasses} onClick={() => handleArrowClick(5)}>
              <ArrowLeftIcon className="w-8" /> <p>Easy</p>
            </div>
          </div>
          <div className="flex flex-col items-center basis-auto flex-grow flex-shrink">
            <div className={arrowBtnClasses} onClick={() => handleArrowClick(0)}>
              <ArrowUpIcon className="w-8" /><p>Normal</p>
            </div>
            <Card key={currentCardIndex} card={currentCard} direction={direction} enableArrowBtns={enableArrowBtns} setEnableArrowBtns={setEnableArrowBtns} />
            <div className={arrowBtnClasses} onClick={() => handleArrowClick(10)}>
              <ArrowDownIcon className="w-8" /> <p>Challenging</p>
            </div>
          </div>
          <div className="flex justify-start items-center flex-grow">
            <div className={arrowBtnClasses} onClick={() => handleArrowClick(-5)}>
              <ArrowRightIcon className="w-8" /> <p>Hard</p>
            </div>
          </div>
        </div>
      )}
      {!currentCard && (
        <div className="h-full w-full bg-black bg-opacity-45 z-50">
          {/* Mensaje o UI para el fin de sesión */}
        </div>
      )}
    </main>
  );
};

export default TimerMode;
