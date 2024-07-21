'use client';
import { useState, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import { Card as CardType } from "@/app/lib/definitions";
import RevealCard from "./reveal-card";
import MultipleChoiceCard from './multiple-choice-card';
import TrueFalseCard from './true-false-card';

interface CardProps {
  card: CardType;
  direction: "up" | "down" | "left" | "right" | null;
  enableArrowBtns: boolean;
  setEnableArrowBtns: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Card({ card, direction, setEnableArrowBtns }: CardProps) {
  const [isCorrect, setCorrect] = useState<boolean>(false);
  const [isDisabled, setDisabled] = useState(false);

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

  return (
    <div className={cardClasses}>
      <div className='mt-16 text-center'>
        <p className='whitespace-normal break-words'>{card.question}</p>
      </div>
      {card.card_type === 0 && (
        <RevealCard card={card} setEnableArrowBtns={setEnableArrowBtns} setDisabled={setDisabled} isDisabled={isDisabled} />
      )}
      {card.card_type === 1 && (
        <MultipleChoiceCard card={card} setEnableArrowBtns={setEnableArrowBtns} setDisabled={setDisabled} isDisabled={isDisabled} setCorrect={setCorrect} />
      )}
      {card.card_type === 2 && (
        <TrueFalseCard card={card} setEnableArrowBtns={setEnableArrowBtns} setDisabled={setDisabled} isDisabled={isDisabled} setCorrect={setCorrect} />
      )}
    </div>
  );
}
