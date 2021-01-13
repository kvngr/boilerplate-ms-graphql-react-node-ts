export interface Book {
    id: string;
    title: string;
    author: string;
}

export interface BookCollection {
    books: Book[];
}
