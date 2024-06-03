'use server';

import {z} from 'zod'; 
import {sql} from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


const FormSchema = z.object({
    name: z.string(),
    description: z.string()
  });

  const CreateDeck = FormSchema.omit({ });
 

export async function deleteInvoice ( invoiceId: string , formData: FormData){

    await sql`DELETE from invoices WHERE id = ${invoiceId}`;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    
}

export function createCard(){

}

export async function createDeck(formData : FormData){
    const { name, description} = CreateDeck.parse({
        name: formData.get('name'),
        description: formData.get('description'),
      });
      await sql`INSERT INTO decks (name, owner_id, description, score, used)
      VALUES (${name},${1},${description},${0},${0})`;

}

export function updateDeckName(){

}

export function updateDeckDescription(){

}

export function updateDeckImage(){

}