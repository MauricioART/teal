import CardCollection from '@/app/ui/deck/card-collection';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCards, fetchDecks } from '@/app/lib/data';

 
export default async function Page({ params }: { params: { deckId: string } }) {
    const deckId = params.deckId;
    const cards= await fetchCards(deckId);
    //const deck = await fetchDecks(deckId);
    console.log(cards);
  return (
    <div className='deck-edit-div h-full w-full'>
      <div className='border-2 border-dotted border-teal-500 p-2'>

      </div>
      <div className='border-2 border-dotted border-teal-900'>
        <CardCollection cards={cards} deck_id={deckId} add={true}/>
      </div>
    </div>
  );
}
/* <Breadcrumbs breadcrumbs={[
          { label: 'Learn', href: '/learn/' },
          {
            label: 'Decks',
            href: `/learn/decks/`,
            active: false,
          },
          { label: 'Create',href: `learn/decks/${deckId}`, active: true},
      ]} />
*/