'use server';

import {z} from 'zod'; 
import {sql} from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


const DeckFormSchema = z.object({
    name: z.string(),
    description: z.string(),
  });

const UserFormSchema = z.object({
  nickname: z.string(),
  email: z.string(),
  pictureProfile: z.string(),
  password: z.string(),
});
  
const CreateUser = UserFormSchema.omit({password: true});
const CreateDeck = DeckFormSchema.omit({ });
 

export async function deleteInvoice ( invoiceId: string , formData: FormData){

    await sql`DELETE from invoices WHERE id = ${invoiceId}`;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    
}

export async function createCard(){

}

export async function createDeck(formData : FormData, owner_id: string){
    const { name, description, } = CreateDeck.parse({
        name: formData.get('name'),
        description: formData.get('description'),
      });
      const image = formData.get('image');
      if (image) {
        // Convert File to Blob (although File is already a Blob)
        const imageBlob = new Blob([image], { type: "file" });
        console.log(image);
        const response = await sql`INSERT INTO decks (name, owner_id, description, score, used)
        VALUES (${name},${owner_id},${description},${0},${0})`;
        console.log(response);
      }

}

export async function updateDeckName(){

}

export async function updateDeckDescription(){

}

export async function updateDeckImage(){

}

export async function authenticate(){

}

export async function signIn(){

}

export async function logOut(){

}

export async function createUser(name: string, mail: string, imageURL: string){
  const { nickname, email, pictureProfile} = CreateUser.parse({
    nickname: name,
    email: mail,
    pictureProfile: imageURL
  });
  const newUserId = await sql`INSERT INTO users (nickname, email, profile_picture_url) 
                    VALUES (${nickname},${email},${pictureProfile}) RETURNING user_id`;
  return newUserId.rows[0].user_id;
}

