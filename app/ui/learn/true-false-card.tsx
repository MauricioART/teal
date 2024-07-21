import { useCallback } from 'react';
import Button from './button';
import { Card as CardType } from "@/app/lib/definitions";

interface TrueFalseCardProps {
  card: CardType;
  setEnableArrowBtns: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
  setCorrect: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TrueFalseCard({ card, setEnableArrowBtns, setDisabled, isDisabled, setCorrect }: TrueFalseCardProps) {
  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const id = parseInt(target.id);
    setCorrect(card.answer == id);
    setDisabled(true);
    setEnableArrowBtns(true);
  }, [card.answer, setEnableArrowBtns, setDisabled, setCorrect]);

  return (
    <div className='flex justify-evenly mb-16'>
      <Button id={0} text="True" color="#06D001" handleButtonClick={handleClick} isDisabled={isDisabled} />
      <Button id={1} text="False" color="#FF0000" handleButtonClick={handleClick} isDisabled={isDisabled} />
    </div>
  );
}
