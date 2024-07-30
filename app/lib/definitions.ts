
export type Deck = {
    deck_id: string;
    name: string;
    owner_id: string;
    description: string;
    coverImage?: Blob;
    score: number;
    used: number;
}

export type User = {
    user_id: string;
    nickname: string;
    email: string;
    pictureProfile: string;
    password: string;
}

export type Card = {
    card_id: number | null;
    deck_id: string | null;
    front: string;
    back: string ;
    image?: string;
}