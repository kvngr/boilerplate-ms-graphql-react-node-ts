import { IBook } from '@types';

import { books } from './data';

export class Book {
    static getAll(): IBook[] {
        return books;
    }
}
