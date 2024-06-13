
import { fetchDecks, fetchCards, getUser } from "@/app/lib/data";
import { Card as cardType, User} from "@/app/lib/definitions";
import Play from "@/app/ui/learn/play";
import { CardMode, TimeMode } from "@/app/ui/learn/modes";
import { auth } from "@/auth";


export default async function Page() {
  const user: User = await getUser("artuaguila@gmail.com");
  
  const cards: cardType[] = [
    { question: "What is the capital of France?", answer: 0, options: ["Paris", "Berlin", "Rome", "Madrid"], cardType: 1, priority: 1 },
    { question: "Is the earth round?", answer: 0, options: ["True", "False"], cardType: 0, priority: 3 },
    { question: "What is 2 + 2?", answer: 1, options: ["3", "4", "5", "6"], cardType: 1, priority: 2 },
    { question: "What is the chemical symbol for water?", answer: 0, options: ["H2O", "CO2", "O2", "H2"], cardType: 1, priority: 4 },
    { question: "Solve the equation: x + 3 = 5. What is x?", answer: 1, options: ["1", "2", "3", "4"], cardType: 1, priority: 5 }
  ];
  if (cards.length > 0){
    return(
      <Play cards={cards} />
    );
  }
  else {
    return(
      <div className="flex flex-wrap justify-center items-center content-around w-full h-full">
        <div className="flex m-20">
        <CardMode />
        </div>
        <div className="flex m-20"><TimeMode /></div>
        
      </div>
    );
  }
}
