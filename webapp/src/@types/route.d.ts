import { RouteComponentProps } from '@reach/router';
import { FC, LazyExoticComponent } from 'react';

export interface Route {
    path: string;
    Component: LazyExoticComponent<FC<RouteComponentProps<Record<string, unknown>>>>;
}
