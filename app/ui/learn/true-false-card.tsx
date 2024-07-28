import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from './button';
import { Card as CardType } from "@/app/lib/definitions";
import clsx from 'clsx';

interface TrueFalseCardProps {
  card: CardType;
  isCorrect: boolean | null;
  setCorrect: React.Dispatch<React.SetStateAction<boolean | null>>;
  priorityAdjustment: number;
  setPriorityAdjustment: React.Dispatch<React.SetStateAction<number>>;
  classes: string;
  setDirection: React.Dispatch<React.SetStateAction<"up" | "down" | "left" | "right" | null>>;
}

export default function TrueFalseCard({ card, isCorrect, setCorrect , priorityAdjustment, setPriorityAdjustment, classes, setDirection}: TrueFalseCardProps) {
  const [isDisabled, setDisabled]  = useState(false);
  const [delayUpdate, setDelayUpdate] = useState(false);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const id = parseInt(target.id);
    setCorrect(card.answer == id);
    setDisabled(true);
    setDelayUpdate(true);
  }, [card.answer, setDisabled, setCorrect, delayUpdate, setDelayUpdate]);

  useEffect(() => {
    let timer: number; 

    if (delayUpdate) {
      timer = window.setTimeout(() => {
        if (isCorrect) {
          setPriorityAdjustment(-5);
          setDirection("right");
        } else {
          setPriorityAdjustment(10);
          setDirection("left");
        }
      }, 1000);
    }
    return () => window.clearTimeout(timer);
  }, [delayUpdate, isCorrect]);

  const cardClasses = useMemo(() => clsx(
    'flex flex-col items-center card-dimensions flex-wrap p-8 rounded-2xl border border-black content-center text-center shadow-lg bg-white',
    {
      'correct': isCorrect && isDisabled,
      'incorrect': !isCorrect && isDisabled,
    }
  ), [ isCorrect, isDisabled, priorityAdjustment]);

  return (
    <div className='flex items-center basis-auto flex-grow flex-shrink justify-center'>
      <div className={classes + cardClasses}>
        <div className='mt-16 text-center'>
          <p className='whitespace-normal break-words'>{card.question}</p>
        </div>
        <div >
          <p>{card.answer}</p>
        </div>
        <div className='flex justify-evenly mb-16'>
          <Button id={0} text="True" color="#06D001" handleButtonClick={handleClick} isDisabled={isDisabled} />
          <Button id={1} text="False" color="#FF0000" handleButtonClick={handleClick} isDisabled={isDisabled} />
        </div>
      </div>
    </div>
  );
}
