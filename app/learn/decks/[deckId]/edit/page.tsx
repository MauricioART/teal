import CardCollection from '@/app/ui/deck/card-collection';
import { fetchCards } from '@/app/lib/data';

 
export default async function Page({ params }: { params: { deckId: string } }) {
    const deckId = params.deckId;
    const cards= await fetchCards(deckId);
    console.log(cards);
  return (
    <main>
      <CardCollection cards={cards} deck_id={deckId} add={true}/>
    </main>
  );
}