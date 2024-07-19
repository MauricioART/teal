'use client';
import { useState, useRef } from "react";
import TimeModeIcon from "./time-mode-icon";
import CardModeIcon from "./card-mode-icon";
import clsx from "clsx";
import { Card, Deck } from "@/app/lib/definitions";
import DeckCarousel from "./deck-carousel";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CardsSelector from "./cards-selector";
import TimeSelector from "./time-selector";
import ServerPlay from "./server-play";
import Play from "./play";
import Alert from '@mui/material/Alert';


interface PlayModeProps {
    decks: Deck[];
    cards: Card[];
}

const PlayMode: React.FC<PlayModeProps> = (props) => {
    const [timeClicked, setTimeClicked] = useState(false);
    const [cardClicked, setCardClicked] = useState(false);
    const [filteredDecks, setFilteredDecks] = useState<Deck[]>([]);
    const [time, setTime] = useState(0);
    const [numberOfCards, setNumberOfCards] = useState(15);
    const [hasStarted, setHasStarted] = useState(false);
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [alertHidden, setAlertHidden] = useState(true);
    

    return (
        <>
            {!(timeClicked || cardClicked) && !hasStarted && (
                <div className={clsx("h-full w-full flex justify-around items-start pt-20", { '': timeClicked, '': cardClicked })}>
                    <div className="">
                        <TimeModeIcon color={"#F7EC63"} width={300} setWasClicked={setTimeClicked} />
                    </div>
                    <div className="">
                        <CardModeIcon color={"#7BF030"} width={300} setWasClicked={setCardClicked} />
                    </div>
                </div>
            )}
            {(timeClicked || cardClicked) && !hasStarted && (
                <div className="h-full flex flex-col items-center relative">
                    <p className="text-2xl">Choose how much time you want to study:</p>
                    <div className="w-full h-fit grid grid-cols-3 justify-center">
                        <button onClick={() => {
                            setCardClicked(false);
                            setTimeClicked(false);
                            setFilteredDecks([]);
                        }}>
                            <ArrowBackIosNewIcon fontSize="large" className="flex-grow w-auto" />
                        </button>
                        {timeClicked && <TimeSelector time={time} setTime={setTime} />}
                        {cardClicked && <CardsSelector numberOfCards={numberOfCards} setNumberOfCards={setNumberOfCards} />}
                        <button onClick={() => {
                            if ( filteredDecks.length > 0){
                            let filtered: Card[] = [];
                            filteredDecks.map((deck) => {
                                filtered.push(...props.cards.filter((card) => {
                                    return card.deck_id === deck.deck_id;
                                }));
                            });
                            setFilteredCards(filtered);
                            console.log(props.cards);

                            setHasStarted(true);
                            } else {
                                setAlertHidden(false);
                            }
                        }}>
                            <ArrowForwardIosIcon fontSize="large" className="flex-grow w-auto" />
                        </button>
                    </div>
                    <p className="text-2xl">Choose what you want to study:</p>
                    <DeckCarousel filteredDecks={filteredDecks} setFilteredDecks={setFilteredDecks} myDecks={props.decks} />
                    <Alert severity="error" className="absolute bottom-10 right-10" hidden={alertHidden}>You have not selected any Deck.</Alert>
                </div>
            )}
            {hasStarted && timeClicked && (
                <Play mode={true} time={time} setTime={setTime} filteredCards={filteredCards} />
            )}
            
            {hasStarted && cardClicked && (
                <Play mode={false} numberOfCards={numberOfCards} filteredCards={filteredCards} />
            )}
        </>
    );
};

export default PlayMode;
