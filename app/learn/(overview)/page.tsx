
import { fetchDecks, fetchCards, getUser } from "@/app/lib/data";
import { Card, User} from "@/app/lib/definitions";
import Play from "@/app/ui/learn/play";
import { CardMode, TimeMode } from "@/app/ui/learn/modes";
import { auth } from "@/auth";

export default async function Page() {

  const session = await auth()
 
  if (!session?.user) return null;

  console.log(session.user.id);

  
  const cards: Card[] = [];
  /*
    { question: "What is the capital of France?", answer: 0, options: ["Paris", "Berlin", "Rome", "Madrid"], card_type: 1},
    { question: "Is the earth round?", answer: 0, options: ["True", "False"], card_type: 0  },
    { question: "What is 2 + 2?", answer: 1, options: ["3", "4", "5", "6"], card_type: 1},
    { question: "What is the chemical symbol for water?", answer: 0, options: ["H2O", "CO2", "O2", "H2"], card_type: 1 },
    { question: "Solve the equation: x + 3 = 5. What is x?", answer: 1, options: ["1", "2", "3", "4"], card_type: 1}
  ];*/

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
