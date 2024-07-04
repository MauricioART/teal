import { sql } from "@vercel/postgres";
import { 
    User,
    Deck,
    Card
} from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchDecks(user_id: string){
    try {
      noStore();
       // await new Promise((resolve) => setTimeout(resolve, 3000));
        const data = await sql<Deck>`
        SELECT * FROM decks WHERE owner_id = ${user_id}`;
        return data.rows;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
      }
}

export async function fetchDeck(deck_id: string){
  try {
    noStore();
     // await new Promise((resolve) => setTimeout(resolve, 3000));
      const data = await sql<Deck>`
      SELECT * FROM decks WHERE deck_id = ${deck_id}`;
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch revenue data.');
    }
}


export async function fetchDecksInfo(user_id: string){
  try{
    noStore();
    console.log('Fetching revenue data...');
    const data = await sql<Deck>`
    SELECT id, name, coverImage, score, used FROM decks WHERE owner_id = "${user_id}"`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchCards(deck_id: string){
    try{
        noStore();
        console.log('Fetching cards...');
        //await new Promise((resolve) => setTimeout(resolve,3000));

        const data = await sql<Card>`
        SELECT * FROM cards WHERE deck_id = ${deck_id}`;
        console.log('Data fetch completed after 3 seconds.');

        return data.rows;
    } catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cards.');
    }
}

export async function fetchNumberOfCards(deck_id: string){
  try{
    const data = await sql`
    SELECT * FROM cards WHERE deck_id = ${deck_id}`;
    return data.rowCount;

  } catch(error){
    console.error('Database Error:', error);
    throw new Error('Failed to fetch number of cards');
  }
}

export async function getUser(email: string) {
    noStore();
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;
      return user.rows[0] as User;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }