
 
export default async function Page({ params }: { params: { cardId: string } }) {
    const cardId = parseInt(params.cardId);
  return (
    <main>
      <h1>{cardId}</h1>
    </main>
  );
}