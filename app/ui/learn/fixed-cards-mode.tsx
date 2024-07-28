import React, { useState, useEffect, useCallback, useMemo } from "react";
import Card from "@/app/ui/learn/card";
import clsx from "clsx";
import { Card as cardType } from "@/app/lib/definitions";
import { Typography } from "@mui/material/";
import Button from "@mui/material/Button";

interface CardsModeProps {
  numberOfCards: number;
  filteredCards: cardType[];
}

const FixedCardsMode: React.FC<CardsModeProps> = ({ numberOfCards, filteredCards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [currentCard, setCurrentCard] = useState<cardType | null>(filteredCards[Math.floor(Math.random() * (filteredCards.length - 1))]);
  const [cardPriority, setCardPriority] = useState<number[]>(new Array(filteredCards.length).fill(50));
  const [cardsLeft, setCardsLeft] = useState<number>(numberOfCards);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isCorrect, setCorrect] = useState<boolean | null>(null);
  const [priorityAdjustment, setPriorityAdjustment] = useState<number>(0);
  const [direction, setDirection] = useState<"up" | "down" | "left" | "right" | null>(null);
  const [activeDelay, setActiveDelay] = useState(false);
  const [activeAnimation, setActiveAnimation] = useState(false);

  const cardClasses = useMemo(() => clsx(
    'flex flex-col justify-between card-dimensions flex-wrap p-8 rounded-2xl border border-black content-center text-center shadow-lg bg-white',
    {
      'animateUp': direction === 'up' && activeAnimation,
      'animateDown': direction === 'down' && activeAnimation,
      'animateLeft': direction === 'left' && activeAnimation,
      'animateRight': direction === 'right' && activeAnimation,
    }
  ), [direction, activeAnimation]);
  
  useEffect(() => {
    if (startTime === null) {
      setStartTime(new Date());
    }
  }, [startTime]);

  useEffect(() => {
    if (cardsLeft === 0) {
      setCurrentCard(null);
      setEndTime(new Date());
    }
  }, [cardsLeft]);

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
  }, [cardPriority, filteredCards, currentCardIndex]);

  /*useEffect(() => {

    if (priorityAdjustment !== null) {
      setCardPriority((prev) => {
        const newPriorities = [...prev];
        newPriorities[currentCardIndex] = Math.min(Math.max(newPriorities[currentCardIndex] + (priorityAdjustment ? priorityAdjustment : 0), 1), 100);
        return newPriorities;
      });
  
      setPriorityAdjustment(null); 
      
      if (isCorrect !== null){
        setActiveDelay(true);
      }else{
        setActiveAnimation(true);
        if (cardsLeft > 0) {
          getNextCard();
          setCardsLeft(cardsLeft - 1);
        }
      }

      console.log("isCorrect: " + isCorrect);
      console.log("Direction: " + direction);
      console.log("activeAnimation: " + activeAnimation);
    }
  }, [priorityAdjustment, activeAnimation, setPriorityAdjustment, setActiveAnimation]); */


  useEffect(() => {
    if (priorityAdjustment !== 0) {
      setCardPriority(prev => {
        const newPriorities = [...prev];
        newPriorities[currentCardIndex] = Math.min(Math.max(newPriorities[currentCardIndex] + (priorityAdjustment ?  priorityAdjustment : 0), 1), 100);
        return newPriorities;
      });
      setPriorityAdjustment(0);

      if (isCorrect === null) {
        setActiveAnimation(true);
        console.log("i got in!");
        if (cardsLeft > 0) {
          getNextCard();
          setCardsLeft(prev => prev - 1);
        }
      } else setActiveDelay(true);
      
      console.log("isCorrect: " + isCorrect);
      console.log("Direction: " + direction);
      console.log("activeAnimation: " + activeAnimation);
    }
  }, [priorityAdjustment, isCorrect, currentCardIndex, cardsLeft, getNextCard]);

  useEffect(() => {
    let timer: number; 
    if (activeDelay) {
      setActiveAnimation(true);
      setCorrect(null);
      timer = window.setTimeout(() => {
        if (cardsLeft > 0) {
          getNextCard();
          setCardsLeft(prev => prev - 1);
        }
        setActiveDelay(false);

      }, 1000);
    }
    return () => window.clearTimeout(timer);
  }, [activeDelay]);

  const elapsedTime = endTime && startTime ? ((endTime.getTime() - startTime.getTime()) / 1000).toFixed(2) : null;

  return (
    <main className="flex h-full px-0 relative">
      <div className="absolute right-10 top-10">
        <Typography variant="h4" className='border-2 border-dotted border-cyan-700 p-5 rounded-full col-span-2 w-fit text-center'>{cardsLeft}</Typography>
      </div>
      {currentCard && (
        <div className="flex w-full h-full overflow-hidden">
        <div className="flex justify-end items-center flex-grow"/>
        
        <Card key={currentCardIndex} card={currentCard} isCorrect={isCorrect} setCorrect={setCorrect} 
                priorityAdjustment={priorityAdjustment} setPriorityAdjutment={setPriorityAdjustment} setDirection={setDirection} classes={cardClasses}/>
        
        <div className="flex justify-start items-center flex-grow"/>
      </div>
      )}
      {!currentCard && (
        <div className="h-full w-full bg-black bg-opacity-45 z-50 flex items-center justify-center">
          <Typography variant="h5" className='text-white'>
            {elapsedTime ? `Session completed in ${elapsedTime} seconds` : "Session completed"}
          </Typography>
          <Button variant="contained" color="primary" onClick={()=>{console.log("")}}>
            Aceptar
          </Button> 
        </div>
      )}
    </main>
  );
};

export default FixedCardsMode;
