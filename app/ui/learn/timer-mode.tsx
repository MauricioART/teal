import { useState, useEffect, useCallback } from "react";
import Card from "@/app/ui/learn/card";
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
  const [isCorrect, setCorrect] = useState<boolean>(false);
  const [priorityAdjustment, setPriorityAdjustment] = useState<number | null>(null);
  const [delayUpdate, setDelayUpdate] = useState(false);


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

  useEffect(() => {
    if (priorityAdjustment !== null) {
      setCardPriority((prev) => {
        const newPriorities = [...prev];
        newPriorities[currentCardIndex] = Math.min(Math.max(newPriorities[currentCardIndex] + (priorityAdjustment ? priorityAdjustment : 0), 1), 100);
        return newPriorities;
      });
  
      setPriorityAdjustment(null); 

      if (time > 0) {
        //setDelayUpdate(true);
        getNextCard();
      }
    }
  }, [priorityAdjustment]);
  
  `useEffect(() => {
    let timer: number; // Usa 'number' en lugar de 'NodeJS.Timeout'

    if (delayUpdate) {
      timer = window.setTimeout(() => {
        getNextCard();
      }, 0);
    }

    // Limpieza del temporizador cuando el componente se desmonta o cuando delayUpdate cambia
    return () => window.clearTimeout(timer);
  }, [delayUpdate]);`

  return (
    <main className="flex h-full px-0 relative">
      <div className="absolute right-10 top-10">
        <Timer start={true} time={time} setTime={setTime} />
      </div>
      {currentCard && (
        <div className="flex w-full h-full overflow-hidden">
          <div className="flex justify-end items-center flex-grow">
          </div>
          <div className="flex flex-col items-center basis-auto flex-grow flex-shrink justify-center">
            {/*<Card key={currentCardIndex} card={currentCard} isCorrect={isCorrect} setCorrect={setCorrect} 
                  priorityAdjustment={priorityAdjustment} setPriorityAdjutment={setPriorityAdjustment}
                  />*/}
          </div>
          <div className="flex justify-start items-center flex-grow">
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
