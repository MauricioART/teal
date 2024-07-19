import { fetchDecks, fetchCards, getUser } from "@/app/lib/data";
import { Card, User} from "@/app/lib/definitions";
import { auth } from "@/auth";
import PlayMode from "@/app/ui/learn/play-mode";

export default async function Page() {

  const session = await auth()
 
  if (!session?.user?.id) return null;
  else {
    const decks = await fetchDecks(session.user.id);
    let allCards: Card[] = [];
    for (const deck of decks) {
      const cards = await fetchCards(deck.deck_id.toString());
      allCards.push(...cards);
    }

  return(
    <div className="h-full w-full">
      <PlayMode decks={decks} cards={allCards}/>
    </div>
  );
}
}


