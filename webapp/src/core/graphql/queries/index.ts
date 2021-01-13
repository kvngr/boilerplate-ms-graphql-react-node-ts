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

export const QUERY_ASSET_COLLECTION = gql`
    query AssetCollection {
        assetCollection {
            items {
                sys {
                    id
                }
                title
                url
                contentType
                description
            }
        }
    }
`;
