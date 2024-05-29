
export type Deck = {
    name: string;
    owner: User;
    description: string;
    coverImage: Blob;
    cards: Card[];
}

export type User = {
    user_id: number;
    nickName: string;
    email: string;
}

export type Card = {
    question: string;
    answer: string | number;
    options?: string[];
    cardType: 0 | 1 | 2;
    priority: number;
}