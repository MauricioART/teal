import { Card } from "@/app/lib/definitions";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Switch } from "@mui/material";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
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
    const [checked, setChecked] = useState(true);

    useEffect(() => {
        setLeftDisabled(props.index === 0);
        setRightDisabled(props.index === props.deck.length - 1);
        setCurrentCard(props.deck[props.index]);
    }, [props.index, props.deck.length,props.deck]);

    const handleOptionChange = (index: number, value: string) => {
        if (currentCard != null && currentCard.options != undefined) {
            const newOptions = [...currentCard.options];
            newOptions[index] = value;
            setCurrentCard({ ...currentCard, options: newOptions });
        }
    };

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (currentCard != null)
            setCurrentCard({ ...currentCard, answer: event.target.checked ? 0 : 1 });
    }

    const handleButtonClick = async () => {
        if (currentCard != null && props.index != null) {
            const response = await updateCard(currentCard);
            let deckBuffer = [...props.deck];
            deckBuffer[props.index] = currentCard;
            props.setDeck(deckBuffer);
        }
        props.handleClose(false);
    };

    return (
        <>
            {props.open &&
                (<div className="h-screen w-screen bg-black bg-opacity-50 z-10 absolute top-0 right-0 flex justify-center items-center"
                    onClick={() => { }}
                >
                    <button type="button" className={clsx('', { '-z-50': leftDisabled })} name="left" onClick={() => {
                        if (props.index > 0) {
                            props.setIndex(props.index - 1);
                            setCurrentCard(props.deck[props.index - 1]);
                        }
                    }}><KeyboardArrowLeftIcon fontSize="large" className="text-white"/></button>
                    <div className="flex h-2/3 w-2/3 p-10 bg-white rounded-2xl z-20 justify-center">
                        <div className="flex flex-col">
                            <div className="flex flex-grow">
                                {currentCard.card_type == 0 && (
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
                                                value={currentCard.question}
                                                onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
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
                                                value={currentCard.answer}
                                                onChange={(event) => setCurrentCard({ ...currentCard, answer: event.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                                {currentCard.card_type == 1 && (
                                    <div className="flex justify-around items-center h-full ">
                                        <div className="flex flex-col mr-5">
                                            <label htmlFor="">Question</label>
                                            <textarea
                                                id="question"
                                                name="question"
                                                placeholder="QUESTION"
                                                rows={6}
                                                cols={50}
                                                className="focus:outline-none focus:border-teal-400 p-2 rounded-lg border-teal-500 border-2"
                                                value={currentCard.question}
                                                onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center items-start">
                                            {currentCard.options && currentCard.options.map((option, index) => (
                                                <div key={index} className="flex flex-col">
                                                    <label htmlFor="" className="">Option {index + 1}</label>
                                                    <input
                                                        type="text"
                                                        placeholder={index === 0 ? "CORRECT ANSWER" : "INCORRECT ANSWER"}
                                                        value={option}
                                                        className="pl-1 border-2 rounded-lg focus:border-teal-400 border-teal-500 mb-1 w-96"
                                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {currentCard.card_type == 2 && (
                                    <div className="flex flex-col items-center h-full px-5 mx-5">
                                        <textarea
                                            id="question"
                                            name="question"
                                            placeholder="QUESTION"
                                            rows={6}
                                            cols={60}
                                            className="focus:outline-none focus:border-teal-400 p-2 rounded-lg border-teal-500 border-2 flex-grow"
                                            value={currentCard.question}
                                            onChange={(event) => setCurrentCard({ ...currentCard, question: event.target.value })}
                                            required
                                        />
                                        <Switch className="self-end flex-grow-0" checked={checked} onChange={handleChecked} color="success">
                                        </Switch>
                                    </div>
                                )}
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
