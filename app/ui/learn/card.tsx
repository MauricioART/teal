import React, { useState, useCallback, useEffect } from 'react';
import Button from './Button';
import { Card as CardType } from "@/app/lib/definitions";

interface CardProps {
  card: CardType;
  setEnableArrowBtns: React.Dispatch<React.SetStateAction<boolean>>;
}

const Card: React.FC<CardProps> = ({ card, setEnableArrowBtns}) => {
  const [reveal, setReveal] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const handleReveal = useCallback(() => {
    setReveal((prev) => !prev);
    setEnableArrowBtns(true);
    setDisabled(true);
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent)=>{
    if (event.key === " " && !isDisabled)
      handleReveal();
  },[handleReveal, isDisabled]);

  useEffect(()=>{
    window.addEventListener("keydown",handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  },[handleKeyPress]);

  return (
    <>
    <div className='mt-16 text-center'>
      <p className='whitespace-normal break-words'>{card.front}</p>
    </div>
    <div className={reveal ? '' : 'invisible'}>
      <p>{card.back}</p>
    </div>
    <div className='mb-16'>
      <Button id={0} text="Reveal" color="#1679AB" handleButtonClick={handleReveal} isDisabled={isDisabled} />
    </div>
  </>
      
  );
};

export default Card;
