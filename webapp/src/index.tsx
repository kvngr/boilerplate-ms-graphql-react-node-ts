import { ApolloProvider } from '@apollo/client';
import { App } from '@components';
import { client } from '@graphql';
import React from 'react';
import { render } from 'react-dom';
import { setConfig } from 'react-hot-loader';
import { hot } from 'react-hot-loader/root';

setConfig({ pureRender: true, pureSFC: true });

const MOUNT_NODE = document.getElementById('app');

render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    MOUNT_NODE,
);

if (process.env.NODE_ENV === 'development') {
    hot(App);
}
