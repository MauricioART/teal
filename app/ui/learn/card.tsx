'use client';
import { useState } from 'react';

export default function Card(props: { adverse: any; reverse: any; }){
    const adverse = props.adverse;
    const reverse = props.reverse;
    const [reveal, setReveal] = useState(false);
    
    function handleClick (){
        setReveal(!reveal);
    }
    return (
        <div className="h-4/5 w-1/3 rounded content-center text-center bg-white" onClick={handleClick}>
            {(reveal) ? adverse:reverse}
        </div>
    );
}