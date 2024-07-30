import { Card } from "@/app/lib/definitions";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import clsx from "clsx";
import React, { useState, useEffect, useCallback } from "react";
import Button from '@mui/material/Button';
import { updateCard } from "@/app/lib/actions";

interface UpdateCardCarouselProps {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    deck: Card[];
    setDeck: React.Dispatch<React.SetStateAction<Card[]>>;
    open: Boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function UpdateCardCarousel(props: UpdateCardCarouselProps) {
    const [currentCard, setCurrentCard] = useState<Card>(props.deck[props.index]);
    const [rightDisabled, setRightDisabled] = useState<Boolean>(false);
    const [leftDisabled, setLeftDisabled] = useState<Boolean>(false);

    useEffect(() => {
        setLeftDisabled(props.index === 0);
        setRightDisabled(props.index === props.deck.length - 1);
        setCurrentCard(props.deck[props.index]);
    }, [props.index, props.deck.length,props.deck]);

   
    const handleButtonClick = async () => {
        if (currentCard != null && props.index != null) {
            const response = await updateCard(currentCard);
            let deckBuffer = [...props.deck];
            deckBuffer[props.index] = currentCard;
            props.setDeck(deckBuffer);
        }
        props.handleClose(false);
    };

    const handleKeyPress = useCallback((event: KeyboardEvent) => {
        switch (event.key) {
          case "ArrowLeft":
            if (props.index > 0) {
                props.setIndex(props.index - 1);
                setCurrentCard(props.deck[props.index - 1]);
            }
            break;
          case "ArrowRight":
            if (props.index < props.deck.length - 1) {
                props.setIndex(props.index + 1);
                setCurrentCard(props.deck[props.index + 1]);
            }
            break;
          case "Escape":
            props.handleClose(false);
          default:
            break;
        }
      }, [props.index, props.setIndex, setCurrentCard]);
    
      useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleKeyPress]);

    return (
        <>
            {props.open &&
                (<div className="h-screen w-screen bg-black bg-opacity-50  absolute top-0 right-0 flex justify-center items-center"
                    onClick={() => {}}
                >
                    <button type="button" className={clsx('', { '-z-50': leftDisabled })} name="left" onClick={() => {
                        if (props.index > 0) {
                            props.setIndex(props.index - 1);
                            setCurrentCard(props.deck[props.index - 1]);
                        }
                    }}><KeyboardArrowLeftIcon fontSize="large" className="text-white"/></button>
                    <div className="flex h-2/3 w-2/3 p-10 bg-white rounded-2xl justify-center z-10">
                        <div className="flex flex-col">
                            <div className="flex flex-grow">
                                <div className="flex justify-around items-center h-full p-10">
                                    <div className="flex flex-col items-start mr-5">
                                        <label className="ml-2">Question</label>
                                        <textarea
                                            id="question"
                                            name="question"
                                            placeholder="QUESTION"
                                            rows={4}
                                            cols={45}
                                            className="focus:outline-none focus:border-none p-2 rounded-lg border-teal-500 border-2"
                                            value={currentCard.front}
                                            onChange={(event) => setCurrentCard({ ...currentCard, front: event.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <label htmlFor="" className="ml-2">Answer</label>
                                        <textarea
                                            id="answer"
                                            name="answer"
                                            rows={4}
                                            placeholder="ANSWER"
                                            cols={45}
                                            className="focus:outline-none focus:border-none p-2 rounded-lg border-teal-500 border-2"
                                            value={currentCard.back}
                                            onChange={(event) => setCurrentCard({ ...currentCard, back: event.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                                
                            </div>
                            <div className=" self-end flex-grow-0">
                                <Button onClick={() => {
                                    props.handleClose(false);
                                }}>Cancel</Button>
                                <Button onClick={handleButtonClick} autoFocus>
                                    Accept
                                </Button>
                            </div>
                        </div>
                    </div>
                    <button type="button" className={clsx('', { '-z-20': rightDisabled })} name="right" onClick={() => {
                        if (props.index < props.deck.length - 1) {
                            props.setIndex(props.index + 1);
                            setCurrentCard(props.deck[props.index + 1]);
                        }
                    }}><KeyboardArrowRightIcon fontSize="large" className="text-white"/></button>
                </div>
            )}
        </>
    );
}
