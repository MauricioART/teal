
export type Deck = {
    name: string;
    owner: User;
    cards: Card[];
}

export type User = {
    user_id: number;
    nickName: string;
    description: string;
}
export type Card = {
    question: string;
    image?: Blob;
    answer: string | number;
    options?: string[];
    cardType: 0 | 1 | 2;
    priority: number;
}