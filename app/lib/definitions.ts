
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
//    card_id: number;
//    deck_id: string;
    question: string;
    answer: string | number;
    options?: string[];
    cardType: 0 | 1 | 2;
}