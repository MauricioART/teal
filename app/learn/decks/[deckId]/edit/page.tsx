import Cards from '@/app/ui/deck/cards';
import { fetchCards } from '@/app/lib/data';

 
export default async function Page({ params }: { params: { deckId: string } }) {
    const deckId = params.deckId;
    const cards= await fetchCards(deckId);
  return (
    <main>
      <Cards cards={cards} deck_id={deckId}/>
    </main>
  );
}