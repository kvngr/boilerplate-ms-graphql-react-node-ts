import { LinkProps as ReachRouterLinkProps } from '@reach/router';
import { ReactNode } from 'react';

type LProps<T> = {
    to?: string;
    children: ReactNode;
} & ReachRouterLinkProps<T>;

export type LinkProps<T> = Omit<JSX.IntrinsicElements['a'], 'href'> & LProps<T>;
