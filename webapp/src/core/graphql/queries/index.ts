import gql from 'graphql-tag';

export const QUERY_BOOK_LIST = gql`
    query BooksList {
        books {
            id
            title
            author
        }
    }
`;
