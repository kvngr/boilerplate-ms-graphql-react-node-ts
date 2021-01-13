/* eslint-disable no-console */
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';

const PORT_GRAPHQL = process.env.PORT_GRAPHQL;
const BASE_URL = process.env.BASE_URL;
const ENDPOINT_GRAPHQL = process.env.ENDPOINT_GRAPHQL;
const API_VERSION = process.env.API_VERSION;

const uri = `${BASE_URL}:${PORT_GRAPHQL}${ENDPOINT_GRAPHQL}${API_VERSION}`;

const cache: InMemoryCache = new InMemoryCache();

export const client = new ApolloClient<NormalizedCacheObject>({
    cache,
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.forEach(({ message, locations, path }) =>
                    console.log(`[GraphQL error]: Message: ${message}, location: ${locations}, Path: ${path}`),
                );
            if (networkError) console.log(`[Network error: ] ${networkError}`);
        }),
        new HttpLink({
            uri,
            credentials: 'same-origin',
        }),
    ]),
});
