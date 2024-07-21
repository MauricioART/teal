'use client';
import { useState, useMemo, useCallback } from 'react';
import Button from './button';
import clsx from 'clsx';
import { Card as CardType } from "@/app/lib/definitions";

interface CardProps {
  card: CardType;
  direction: "up" | "down" | "left" | "right" | null;
  enableArrowBtns: boolean;
  setEnableArrowBtns: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Card({ card, direction, setEnableArrowBtns }: CardProps) {
  const [reveal, setReveal] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isCorrect, setCorrect] = useState<boolean>(false);

  const cardClasses = useMemo(() => clsx(
    'flex flex-col justify-between card-dimensions flex-wrap p-8 rounded-2xl border border-black content-center text-center shadow-lg bg-white',
    {
      'animateUp': direction === "up",
      'animateDown': direction === "down",
      'animateLeft': direction === "left",
      'animateRight': direction === "right",
      'correct': isCorrect && isDisabled,
      'incorrect': !isCorrect && isDisabled,
    }
  ), [direction, isCorrect, isDisabled]);

  const handleReveal = useCallback(() => {
    setReveal(!reveal);
    setEnableArrowBtns(true);
  }, [reveal, setEnableArrowBtns]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const id = parseInt(target.id);
    setCorrect(card.answer === id);
    setDisabled(true);
    setEnableArrowBtns(true);
  }, [card.answer, setEnableArrowBtns]);

  const renderButtons = useCallback(() => {
    return card.options?.map((option, index) => (
      <div key={index}>
        <Button id={index} text={String.fromCharCode(65 + index)} color="#98D7C2" handleButtonClick={handleClick} isDisabled={isDisabled} />
        {option}
      </div>
    ));
  }, [card.options, handleClick, isDisabled]);

  return (
    <div className={cardClasses}>
      <div className='mt-16 text-center'>
        <p className='whitespace-normal break-words'>{card.question}</p>
      </div>
      {card.card_type === 0 && (
        <>
          <div className={reveal ? '' : 'invisible'}>
            <p>{card.answer}</p>
          </div>
          <div className='mb-16'>
            <Button id={0} text="Reveal" color="#1679AB" handleButtonClick={handleReveal} isDisabled={isDisabled} />
          </div>
        </>
      )}
      {card.card_type === 1 && card.options && (
        <div className='flex flex-col flex-wrap items-start ml-4 mb-10'>
          {renderButtons()}
        </div>
      )}
      {card.card_type === 2 && (
        <div className='flex justify-evenly mb-16'>
          <Button id={0} text="True" color="#06D001" handleButtonClick={handleClick} isDisabled={isDisabled} />
          <Button id={1} text="False" color="#FF0000" handleButtonClick={handleClick} isDisabled={isDisabled} />
        </div>
      )}
    </div>
  );
}