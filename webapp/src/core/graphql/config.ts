/* eslint-disable no-console */
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';

const { BASE_URL, API_PORT, ROOT_ENDPOINT, API_VERSION } = process.env;

const uri = `${BASE_URL}:${API_PORT}${ROOT_ENDPOINT}${API_VERSION}`;

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
