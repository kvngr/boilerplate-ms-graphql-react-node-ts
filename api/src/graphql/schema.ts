import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Book {
        id: String
        title: String
        author: String
    }

    type Auhor {
        name: String
    }

    type Query {
        books: [Book]
    }
`;
