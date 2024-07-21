import React, { useCallback, useEffect, useState } from 'react';
import Button from './button';
import { Card as CardType } from "@/app/lib/definitions";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';

interface MultipleChoiceCardProps {
  card: CardType;
  setEnableArrowBtns: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  setCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MultipleChoiceCard({ card, setEnableArrowBtns, setDisabled, isDisabled, setCorrect }: MultipleChoiceCardProps) {
  const correctAnswer = card.options ? card.options[typeof card.answer === 'number' ? card.answer : 0] : null;
  const [options, setOptions] = useState<string[]>([]);

  function shuffleArray<T>(array: T[]): T[] {
    // Copiar el arreglo original para no modificarlo directamente
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {
    if (card.options) {
      setOptions(shuffleArray(card.options));
    }
    console.log(correctAnswer);
    console.log(options);
  }, [card, correctAnswer]);

  const handleClick = useCallback((option: string) => {
    setCorrect(correctAnswer === option);
    setDisabled(true);
    setEnableArrowBtns(true);
  }, [correctAnswer, setEnableArrowBtns, setDisabled, setCorrect]);

  return (
    <div className='flex flex-col w-full mb-1'>
      {options.map((option, index) => (
        <div key={index} onClick={() => handleClick(option)} 
        className={clsx('hover:cursor-pointer w-full flex items-center relative rounded-2xl mb-1',
            {'bg-red-200': isDisabled && option != correctAnswer,
             'bg-green-200': isDisabled && option == correctAnswer,

        })}>
            <Button id={index} text={String.fromCharCode(65 + index)} color="#37B7C3" handleButtonClick={() => {}} isDisabled={isDisabled} />
            {option}
            <div className='absolute right-1' hidden={!isDisabled}>
                { option == correctAnswer ? <CheckIcon className='text-green-600'/> : <CloseIcon className='text-red-600'/> }
            </div>
        </div>
      ))}
    </div>
  );
}
