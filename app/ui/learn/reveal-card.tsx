import { useState, useCallback } from 'react';
import Button from './button';
import { Card as CardType } from "@/app/lib/definitions";

interface RevealCardProps {
  card: CardType;
  setEnableArrowBtns: React.Dispatch<React.SetStateAction<boolean>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
}

export default function RevealCard({ card, setEnableArrowBtns, setDisabled, isDisabled }: RevealCardProps) {
  const [reveal, setReveal] = useState(false);

  const handleReveal = useCallback(() => {
    setReveal(!reveal);
    setEnableArrowBtns(true);
    setDisabled(true);
  }, [reveal, setEnableArrowBtns, setDisabled]);

  return (
    <>
      <div className={reveal ? '' : 'invisible'}>
        <p>{card.answer}</p>
      </div>
      <div className='mb-16'>
        <Button id={0} text="Reveal" color="#1679AB" handleButtonClick={handleReveal} isDisabled={isDisabled} />
      </div>
    </>
  );
}
