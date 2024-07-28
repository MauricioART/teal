'use client';
import { useState, useMemo } from 'react';
import clsx from 'clsx';
import { Card as CardType } from "@/app/lib/definitions";
import RevealCard from "./reveal-card";
import MultipleChoiceCard from './multiple-choice-card';
import TrueFalseCard from './true-false-card';


interface CardProps {
  card: CardType;
  isCorrect: boolean | null;
  setCorrect: React.Dispatch<React.SetStateAction<boolean| null>>;
  priorityAdjustment: number;
  setPriorityAdjutment: React.Dispatch<React.SetStateAction<number>>;
  classes: string;
  setDirection: React.Dispatch<React.SetStateAction<"up"|"down"|"right"|"left"|null>>;
}

export default function Card({ card, isCorrect, setCorrect, priorityAdjustment, setPriorityAdjutment , classes, setDirection}: CardProps) {
  switch (card.card_type) {
    case 0:
      return <RevealCard card={card} setPriorityAdjustment={setPriorityAdjutment} classes ={classes} setDirection={setDirection}/>;
    case 1:
      return <MultipleChoiceCard card={card} isCorrect={isCorrect} setCorrect={setCorrect} 
      priorityAdjustment={priorityAdjustment} setPriorityAdjustment={setPriorityAdjutment} classes ={classes} setDirection={setDirection}/>;
    case 2:
      return <TrueFalseCard card={card} isCorrect={isCorrect} setCorrect={setCorrect} 
      priorityAdjustment={priorityAdjustment} setPriorityAdjustment={setPriorityAdjutment} classes ={classes} setDirection={setDirection}/>;
    default:
      return null;
  }
}