'use client';
import { useState } from 'react';
import Button from './button';
import RadioButton from './radio-button';
import clsx from 'clsx';
import { Card as card} from "@/app/lib/definitions";

interface cardProps {
    card: card;
    direction: "up" | "down" | "left" | "right" | null;
    enableArrowBtns: boolean;
    setEnableArrowBtns: React.Dispatch<React.SetStateAction<boolean>>;

}

export default function Card(props: cardProps){
    const question = props.card.question;
    const answer = props.card.answer;
    const [reveal, setReveal] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [isHidden, setHidden] = useState(false);
    const [isCorrect, setCorrect] = useState<boolean>(false);
    

    const cardClasses = clsx(
        'flex flex-col justify-between card-dimensions flex-wrap p-8 rounded-2xl border border-black content-center text-center shadow-lg bg-white',
        {
          'animateUp': props.direction === "up", 
          'animateDown': props.direction === "down",
          'animateLeft': props.direction === "left",
          'animateRight': props.direction === "right",
          'correct': isCorrect && isDisabled,
          'incorrect': !isCorrect && isDisabled,
        }
      );
    
    function handleReveal (){
        setReveal(!reveal);
        props.setEnableArrowBtns(true);
    }

    function handleClick(event: React.MouseEvent<HTMLButtonElement>){
        const target = event.target as HTMLButtonElement;
        const id = parseInt(target.id);
        if (answer === id){
            setCorrect(true);
        }
        else{
            setCorrect(false);
        }
        setDisabled(true);
        props.setEnableArrowBtns(true);
    }

    switch (props.card.cardType){
        case 0:
            return (
                <div className={cardClasses}>
                    <div className='mt-16'>
                        {question}
                    </div>
                    <div className='flex justify-evenly mb-16 '>
                        <Button key={0} id={0} text="True" color="#98D7C2" handleButtonClick={handleClick} isDisabled={isDisabled}/>
                        <Button key={1} id={1} text="False" color="#98D7C2" handleButtonClick={handleClick} isDisabled={isDisabled}/>
                    </div>
                    
                </div>
            );
            break;
        case 1:
            if (props.card.options)
            return (
                <div className={cardClasses}>
                    <div className='mt-16'>
                        {question}
                    </div>
                    <div className='flex flex-col flex-wrap items-start ml-4 mb-10'>
                    <div>
                        <Button key={0} id={0} text="A" color="#98D7C2" handleButtonClick={handleClick} isDisabled={isDisabled}/>
                        {props.card.options[0]}
                    </div>
                    <div>
                        <Button key={1} id={1} text="B" color="#98D7C2" handleButtonClick={handleClick} isDisabled={isDisabled}/>
                        {props.card.options[1]}
                    </div>
                    <div>
                        <Button key={2} id={2} text="C" color="#98D7C2" handleButtonClick={handleClick} isDisabled={isDisabled}/>
                        {props.card.options[2]}
                    </div>
                    <div>
                        <Button key={3}  id={3} text="D" color="#98D7C2" handleButtonClick={handleClick} isDisabled={isDisabled}/>
                        {props.card.options[3]}
                    </div>
                        {/*<RadioButton options={answer}/>*/}
                    </div>
                    
                </div>
            );
            break;
        case 2:
            return (
                <div className={cardClasses}>
                    <div className='mt-16'>
                        {question}
                    </div>
                    <div className={(reveal)?'':'invisible'}>
                        <p>{answer}</p>
                    </div>
                    <div className='mb-16' hidden={isHidden}>
                        <Button key={0} id={0} text="Reveal" color="#98D7C2" handleButtonClick={handleReveal}isDisabled={isDisabled} />
                    </div>
                    
                </div>
            );
            break;
        default:
            break;
    }

}
    
