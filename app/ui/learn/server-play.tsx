'use server';
import { Deck as deckType, Card as cardType } from "@/app/lib/definitions";
import { fetchCards } from "@/app/lib/data";

interface ServerPlayProps {
  decks: deckType[];
}

const ServerPlay: React.FC<ServerPlayProps> = async ({ decks }) => {
  let filteredCards: cardType[] = [];

  // Usamos Promise.all para manejar las promesas de manera eficiente
  await Promise.all(decks.map(async (deck) => {
    const cards = await fetchCards(deck.deck_id.toString());
    filteredCards = [...filteredCards, ...cards];
  }));

  return (
    <div>
      {filteredCards.length > 0 ? (
        filteredCards.map((card, index) => (
          <div key={index}>
            {card.answer}
          </div>
        ))
      ) : (
        <div>No cards available</div>
      )}
    </div>
  );
};

export default ServerPlay;
