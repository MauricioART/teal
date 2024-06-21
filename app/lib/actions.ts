'use server';

import {z} from 'zod'; 
import {sql} from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Card } from '@/app/lib/definitions';

const DeckFormSchema = z.object({
    name: z.string(),
    description: z.string(),
    owner_id: z.string().uuid()
  });

const UserFormSchema = z.object({
  nickname: z.string(),
  email: z.string().email(),
  pictureProfile: z.string(),
  password: z.optional(z.string()),
});
const CardFormSchema = z.object({
  card_id: z.number(),
  deck_id: z.string().uuid(),
  question: z.string(),
  answer: z.union([z.string(), z.number()]),
  options: z.optional(z.array(z.string())),
  card_type: z.union([z.string(), z.number()])
});
  
const CreateCard = CardFormSchema.omit({card_id:true});
 

export async function deleteInvoice ( invoiceId: string , formData: FormData){

    await sql`DELETE from invoices WHERE id = ${invoiceId}`;
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
    
}

export async function createCard(deckId: string, card: Card){
  const {deck_id, question, answer, options, card_type} = CreateCard.parse({
    deck_id : deckId,
    question: card.question,
    answer: card.answer,
    options: card.options,
    card_type: card.card_type
  });
  if (options != undefined){
    let optionsStr = "{";
    options.map((option,index)=>{
      if (index < options.length - 1)
        optionsStr = optionsStr + '"' + option + '"' + ",";
      else
        optionsStr = optionsStr + '"' + option + '"' + "}";
    console.log(optionsStr);
    });
    const response = await sql`INSERT INTO cards (deck_id,question,answer,options,card_type)
                              VALUES (${deck_id},${question},${answer},${optionsStr},${card_type})`;
  }else{
    const response = await sql`INSERT INTO cards (deck_id,question,answer,card_type)
                              VALUES (${deck_id},${question},${answer},${card_type})`;
  }
  revalidatePath('/learn/decks');
  redirect('/learn/decks');
}

export async function updateCard(card : Card){
  const {card_id, deck_id, question, answer, options, card_type} = CardFormSchema.parse({
    deck_id : card.deck_id,
    question: card.question,
    answer: card.answer,
    options: card.options,
    card_type: card.card_type,
    card_id : card.card_id,
  });
  if (options != undefined){
    let optionsStr = "{";
    options.map((option,index)=>{
      if (index < options.length - 1)
        optionsStr = optionsStr + '"' + option + '"' + ",";
      else
        optionsStr = optionsStr + '"' + option + '"' + "}";
    console.log(optionsStr);
    });
    const response = await sql`UPDATE cards SET (deck_id,question,answer,options,card_type)
                              = (${deck_id},${question},${answer},${optionsStr},${card_type})
                              WHERE deck_id = ${deck_id} AND card_id = ${card_id}`;
  }else{
    const response = await sql`UPDATE cards SET (deck_id,question,answer,card_type)
                              = (${deck_id},${question},${answer},${card_type})
                              WHERE deck_id = ${deck_id} AND card_id = ${card_id}`;
  }
}

export async function createDeck(formData : FormData){
    const { name, description, owner_id, } = DeckFormSchema.parse({
        name: formData.get('name'),
        description: formData.get('description'),
        owner_id: formData.get('owner_id')
      });
      const image = formData.get('image');
      if (name && description && owner_id) {
        // Convert File to Blob (although File is already a Blob)
        //const imageBlob = new Blob([image], { type: "file" });
        //console.log(image);
        const response = await sql`INSERT INTO decks (name, owner_id, description, score, used)
        VALUES (${name},${owner_id},${description},${0},${0}) RETURNING deck_id`;
        return response.rows[0].deck_id;
      }
      return null;
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

export async function createUser(name: string, mail: string, imageURL: string, passwd?: string){
  const { nickname, email, pictureProfile, password} = UserFormSchema.parse({
    nickname: name,
    email: mail,
    pictureProfile: imageURL,
    password: passwd
  });
  const newUserId = await sql`INSERT INTO users (nickname, email, profile_picture_url) 
                    VALUES (${nickname},${email},${pictureProfile}) RETURNING user_id`;
  return newUserId.rows[0].user_id;
}

