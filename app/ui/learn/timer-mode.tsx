import { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/24/outline';
import Card from "@/app/ui/learn/card";
import { Card as cardType } from "@/app/lib/definitions";
import Timer from "./timer";
import clsx from "clsx";

interface TimerModeProps {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  filteredCards: cardType[];
}

const TimerMode: React.FC<TimerModeProps> = ({ time, setTime, filteredCards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<cardType | null>(filteredCards[Math.floor(Math.random() * (filteredCards.length - 1))]);
  const [cardPriority, setCardPriority] = useState<number[]>(new Array(filteredCards.length).fill(50));
  const [priorityAdjustment, setPriorityAdjustment] = useState<number | null>(null);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right" | null>(null);
  const [activeDelay, setActiveDelay] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [enableArrowBtns, setEnableArrowBtns] = useState(false);
  


  useEffect(() => {
    if (time === 0) {
      setCurrentCard(null);
    }
  }, [time]);

  const arrowBtnClasses = clsx('w-auto flex flex-col items-center opacity-0', {
    'animateFadeIn': enableArrowBtns,
  });

  const cardClasses = useMemo(() => clsx(
    'flex flex-col justify-between card-dimensions  flex-wrap p-8 rounded-2xl border border-black content-center text-center shadow-lg bg-white',
    {
      'animateUp': direction === 'up' && activeAnimation,
      'animateDown': direction === 'down' && activeAnimation,
      'animateLeft': direction === 'left' && activeAnimation,
      'animateRight': direction === 'right' && activeAnimation,
    }
  ), [direction, activeAnimation]);

  const handleArrowClick = useCallback((adjustment: number) => {
    if (enableArrowBtns) {
      setEnableArrowBtns(false);
      switch (adjustment) {
        case 0:
          setDirection("up");
          break;
        case 5:
          setDirection("left");
          break;
        case 10:
          setDirection("down");
          break;
        case -5:
          setDirection("right");
          break;
        default:
          break;
      }
      setPriorityAdjustment(adjustment);
    }
  }, [enableArrowBtns, setPriorityAdjustment]);

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

  useEffect(() => {
    if (priorityAdjustment !== null) {
      setCardPriority((prev) => {
        const newPriorities = [...prev];
        newPriorities[currentCardIndex] = Math.min(Math.max(newPriorities[currentCardIndex] + (priorityAdjustment ? priorityAdjustment : 0), 1), 100);
        return newPriorities;
      });
  
      setPriorityAdjustment(null); 
      setActiveDelay(true);

    }
  }, [priorityAdjustment, currentCardIndex]);

  
  useEffect(() => {
    let changeCardTimer: number;
    let endAnimationTimer: number;
  
    if (activeDelay) {
      setActiveAnimation(true);
      setEnableArrowBtns(false);
  
      // Temporizador para cambiar la carta
      changeCardTimer = window.setTimeout(() => {
        if (time > 0) {
          getNextCard();
        }
      }, 1000);
  
      // Temporizador para detener la animación y reactivar los botones
      endAnimationTimer = window.setTimeout(() => {
        setActiveAnimation(false);
        setActiveDelay(false);
      }, 2000); // 1000ms después de cambiar la carta
    }
  
    // Limpiar temporizadores al desmontar el efecto o al cambiar de dependencia
    return () => {
      window.clearTimeout(changeCardTimer);
      window.clearTimeout(endAnimationTimer);
    };
  }, [activeDelay]);

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
            
            <div className={cardClasses}>
              <Card key={currentCardIndex} card={currentCard} setEnableArrowBtns={setEnableArrowBtns}/>
            </div>
            
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
