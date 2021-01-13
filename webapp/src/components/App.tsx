import { Loader } from '@components';
import { LanguageProvider } from '@context';
import { Router } from '@reach/router';
import { routes } from '@routes';
import React, { FC, Suspense } from 'react';

import { GlobalStyle } from './styles';

export const App: FC = () => {
    const AppRouter = (
        <Suspense fallback={<Loader />}>
            <Router>
                {routes.map(({ path, Component }, key) => (
                    <Component path={path} key={key} />
                ))}
            </Router>
        </Suspense>
    );

    return (
        <LanguageProvider>
            <GlobalStyle />
            {AppRouter}
        </LanguageProvider>
    );
};
