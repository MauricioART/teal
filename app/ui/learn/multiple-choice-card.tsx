import { useCallback, useEffect, useMemo, useState } from 'react';
import Button from './button';
import { Card as CardType } from "@/app/lib/definitions";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

interface MultipleChoiceCardProps {
  card: CardType;
  isCorrect: boolean | null;
  setCorrect: React.Dispatch<React.SetStateAction<boolean| null>>;
  priorityAdjustment: number;
  setPriorityAdjustment: React.Dispatch<React.SetStateAction<number>>;
  classes: string;
  setDirection: React.Dispatch<React.SetStateAction<"up" | "down" | "left" | "right" | null>>;
}

export default function MultipleChoiceCard({ card, isCorrect, setCorrect, priorityAdjustment, setPriorityAdjustment , classes, setDirection}: MultipleChoiceCardProps) {
  const correctAnswer = card.options ? card.options[typeof card.answer === 'number' ? card.answer : 0] : null;
  const [options, setOptions] = useState<string[]>([]);
  const [isDisabled, setDisabled] = useState(false);
  const [delayUpdate, setDelayUpdate] = useState(false);
  

  function shuffleArray<T>(array: T[]): T[] {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {
    let timer: number; // Usa 'number' en lugar de 'NodeJS.Timeout'

    if (delayUpdate) {
      timer = window.setTimeout(() => {
        if (isCorrect) {
          setPriorityAdjustment(-5);
          setDirection("up");
        } else {
          setPriorityAdjustment(10);
          setDirection("down");
        }
      }, 1000);
    }

    // Limpieza del temporizador cuando el componente se desmonta o cuando delayUpdate cambia
    return () => window.clearTimeout(timer);
  }, [delayUpdate, isCorrect]);

  useEffect(() => {
    if (card.options) {
      setOptions(shuffleArray(card.options));
    }
  }, [card, correctAnswer]);

  const handleClick = useCallback((option: string) => {
    setCorrect(correctAnswer === option);
    setDelayUpdate(true);
    setDisabled(true);
  }, [correctAnswer, setDisabled, setCorrect]);

  const cardClasses = useMemo(() => clsx(
    'flex flex-col justify-between card-dimensions flex-wrap p-8 rounded-2xl border border-black content-center text-center shadow-lg bg-white',
    {
      'animateUp': priorityAdjustment != null && isCorrect,
      'animateDown': priorityAdjustment != null && !isCorrect,
    }
  ), [priorityAdjustment, isCorrect]);

  return (
    <div className='flex items-center basis-auto flex-grow flex-shrink justify-center'>
      <div className={classes}>
      <div className='mt-16 text-center'>
        <p className='whitespace-normal break-words'>{card.question}</p>
      </div>
      <div className='flex flex-col w-full mb-1'>
        {options.map((option, index) => (
          <div key={index} onClick={() => handleClick(option)} 
          className={clsx('hover:cursor-pointer w-full flex items-center relative rounded-2xl mb-1',
              {'incorrect-answer': isDisabled && option != correctAnswer,
              'correct-answer': isDisabled && option == correctAnswer,

          })}>
              <Button id={index} text={String.fromCharCode(65 + index)} color="#37B7C3" handleButtonClick={() => {}} isDisabled={isDisabled} />
              {option}
              <div className='absolute right-1' hidden={!isDisabled}>
                  { option == correctAnswer ? <CheckIcon className='text-green-600'/> : <CloseIcon className='text-red-600'/> }
              </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
}
