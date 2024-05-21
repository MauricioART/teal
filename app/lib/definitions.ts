type cardContent = {
    text: string | null;
    image: Blob | null;
}

export type CardType = {
    adverse: cardContent;
    reverse: cardContent;
}
export type Deck = {
    name: string;

}

export type User = {
    nickName: string;
    description: string;
}