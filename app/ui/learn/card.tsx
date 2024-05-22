'use client';
import { useState } from 'react';
import Button from './Button';
import clsx from 'clsx';


export default function Card(props: { question: any; answer: any; cardType: number; up: boolean; right: boolean; down: boolean; left: boolean;}){
    const question = props.question;
    const answer = props.answer;
    const [reveal, setReveal] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isHidden, setHidden] = useState(false);
    
    const cardClasses = clsx(
        'flex flex-col justify-between h-4/5 w-1/3 rounded content-center text-center shadow-lg bg-white',
        {
          'animateUp': props.up, 
          'animateDown': props.down,
          'animateLeft': props.left,
          'animateRight': props.right,
        }
      );
    
    function handleReveal (){
        setReveal(!reveal);
    }

    function handleClick(){
        
    }
    function disable(){
        return true;
    }

    switch (props.cardType){
        case 0:
            return (
                <div className={cardClasses} onClick={handleClick}>
                    <div className='mt-16'>
                        {question}
                    </div>
                    <div className='flex justify-evenly mb-16'>
                        <Button text="True" color="#98D7C2" handleButtonClick={handleClick}/>
                        <Button text="False" color="#98D7C2" handleButtonClick={handleClick}/>
                    </div>
                    
                </div>
            );
            break;
        case 1:
            return (
                <div className={cardClasses} onClick={handleClick}>
                    <div className='mt-16'>
                        {question}
                    </div>
                    <div className='flex flex-col flex-wrap items-start ml-4 mb-10'>
                    <div>
                        <Button text="A" color="#98D7C2" handleButtonClick={handleClick}/>
                        {answer[0]}
                    </div>
                    <div>
                        <Button text="B" color="#98D7C2" handleButtonClick={handleClick}/>
                        {answer[1]}
                    </div>
                    <div>
                        <Button text="C" color="#98D7C2" handleButtonClick={handleClick}/>
                        {answer[2]}
                    </div>
                    <div>
                        <Button text="D" color="#98D7C2" handleButtonClick={handleClick} />
                        {answer[3]}
                    </div>
                    </div>
                
                </div>
            );
            break;
        case 2:
            return (
                <div className={cardClasses} onClick={handleClick}>
                    <div className='mt-16'>
                        {question}
                    </div>
                    <div>
                    {(reveal) ? answer: null}
                    </div>
                    <div className='mb-16' hidden={isHidden}>
                        <Button text="Reveal" color="#98D7C2" handleButtonClick={handleReveal} />
                    </div>
                    
                </div>
            );
            break;
        default:
            break;
    }

}
    
