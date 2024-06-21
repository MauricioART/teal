
export type Deck = {
    deck_id: number;
    name: string;
    owner_id: number;
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
    card_id: string | null;
    deck_id: string | null;
    question: string;
    answer: string | number;
    options?: string[];
    card_type: number | null;
}