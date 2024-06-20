import NewCardForm from "@/app/ui/deck/create-card-form";
 
export default async function Page({ params }: { params: { cardId: string } }) {
    const cardId = parseInt(params.cardId);
  return (
    <main>
      <div>
        <h1>{cardId}</h1>
      </div>
      <div>
        <NewCardForm />
      </div>

    </main>
  );
}