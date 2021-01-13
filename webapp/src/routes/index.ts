import { Route } from '@types';
import { lazy } from 'react';

// Dynamic destructuring component import
const Home = lazy(() => import('@components').then(({ Home }) => ({ default: Home })));

export const routes: Route[] = [
    {
        path: '/',
        Component: Home,
    },
];
