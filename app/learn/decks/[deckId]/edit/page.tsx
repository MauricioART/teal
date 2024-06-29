import CardCollection from '@/app/ui/deck/card-collection';
import { fetchCards } from '@/app/lib/data';
import Breadcrumbs from '@/app/ui/breadcrumbs';

 
export default async function Page({ params }: { params: { deckId: string } }) {
    const deckId = params.deckId;
    const cards= await fetchCards(deckId);
    console.log(cards);
  return (
    <main>
      <Breadcrumbs breadcrumbs={[
          { label: 'Learn', href: '/learn/' },
          {
            label: 'Decks',
            href: `/learn/decks/`,
            active: false,
          },
          { label: 'Create',href: `learn/decks/${deckId}`, active: true},
      ]} />
      <CardCollection cards={cards} deck_id={deckId} add={true}/>
    </main>
  );
}