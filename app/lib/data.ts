import { sql } from "@vercel/postgres";
import { 
    User,
    Deck,
    Card
} from "@/app/lib/definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchDecks(user_id: number){
    try {
        console.log('Fetching revenue data...');
        await new Promise((resolve) => setTimeout(resolve, 3000));
    
        const data = await sql<Deck>`
        SELECT * FROM Deck WHERE owner_id = "${user_id}"`;
    
        console.log('Data fetch completed after 3 seconds.');
    
        return data.rows;
      } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch revenue data.');
      }
}

export async function fetchCards(deck_id: number){
    try{
        console.log('Fetching cards...');
        await new Promise((resolve) => setTimeout(resolve,3000));

        const data = await sql<Card>`
        SELECT * FROM Card WHERE deck_id = ${deck_id}`;
        console.log('Data fetch completed after 3 seconds.');

        return data.rows;
    } catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch cards.');
    }
}

export async function getUser(email: string) {
    noStore();
    try {
      const user = await sql`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0] as User;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }