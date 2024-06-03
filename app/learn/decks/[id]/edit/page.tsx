
import { fetchCards } from '@/app/lib/data';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const cards= await fetchCards(id);
  return (
    <main>
        <h1>HELLO {id}</h1>
    </main>
  );
}