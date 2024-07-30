import CardCollection from '@/app/ui/deck/card-collection';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchCards, fetchDeck } from '@/app/lib/data';
import DeckIcon from '@/app/ui/deck/deck-icon';

 
export default async function Page({ params }: { params: { deckId: string } }) {
    const deckId = params.deckId;
    const cards= await fetchCards(deckId);
    const deck = await fetchDeck(deckId);
  return (
    <div className='h-full w-full'>
      <Breadcrumbs breadcrumbs={[
          { label: 'Learn', href: '/learn/' },
          {
            label: 'Decks',
            href: `/learn/decks/`,
            active: false,
          },
          { label: 'Edit',href: `learn/decks/${deckId}/edit`, active: true},
      ]} />
      <div className='deck-edit-div h-full w-full px-8 py-4 overflow-hidden'>
        <div className=' col-start-1 col-end-2 justify-self-center place-self-center border-2 border-teal-400 rounded-md shadow-xl p-2'>
          <DeckIcon selectable={false}/>
        </div>
        <div className=' col-start-1 row-start-2 row-span-2 pl-6'>
          <p>Titulo: {deck[0].name}</p>        
          <p>Description: {deck[0].description}</p>
        </div>
        <div className='col-start-2 row-start-1 row-end-5  h-full w-full'>
          <CardCollection cards={cards} deck_id={deckId} add={true}/>
        </div>
      </div>
    </div>

  );
}
