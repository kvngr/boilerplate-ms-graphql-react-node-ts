import { IBook } from '@types';

import { Book } from './Book';

export const bookResolver = {
    Query: {
        books: (): IBook[] => Book.getAll(),
    },
};
