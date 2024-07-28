import { useState, useMemo, useCallback, useEffect } from 'react';
import Button from './button';
import clsx from 'clsx';
import { Card as CardType } from "@/app/lib/definitions";
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@heroicons/react/24/outline';

interface RevealCardProps {
  card: CardType;
  setPriorityAdjustment: React.Dispatch<React.SetStateAction<number>>;
  setDirection: React.Dispatch<React.SetStateAction<"up" | "down" | "left" | "right" | null>>;
  classes: string;
}

const RevealCard: React.FC<RevealCardProps> = ({ card, setPriorityAdjustment, setDirection, classes}) => {
  const [reveal, setReveal] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [enableArrowBtns, setEnableArrowBtns] = useState(false);

  
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

  const arrowBtnClasses = clsx('w-auto flex flex-col items-center opacity-0', {
    'animateFadeIn': enableArrowBtns,
  });

  const handleReveal = useCallback(() => {
    setReveal((prev) => !prev);
    setEnableArrowBtns(true);
    setDisabled(true);
  }, []);

  return (
    <div className="flex items-center basis-auto flex-grow flex-shrink">
      <div className="flex justify-end items-center flex-grow">
        <div className={arrowBtnClasses} onClick={() => handleArrowClick(5)}>
          <ArrowLeftIcon className="w-8" /> <p>Easy</p>
        </div>
      </div>
      <div className="h-full flex flex-col items-center basis-auto flex-grow flex-shrink">
        <div className={arrowBtnClasses} onClick={() => handleArrowClick(0)}>
          <ArrowUpIcon className="w-8" /><p>Normal</p>
        </div>
        <div className={classes}>
          <div className='mt-16 text-center'>
            <p className='whitespace-normal break-words'>{card.question}</p>
          </div>
          <div className={reveal ? '' : 'invisible'}>
            <p>{card.answer}</p>
          </div>
          <div className='mb-16'>
            <Button id={0} text="Reveal" color="#1679AB" handleButtonClick={handleReveal} isDisabled={isDisabled} />
          </div>
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
  );
};

export default RevealCard;

