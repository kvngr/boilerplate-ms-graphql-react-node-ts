import { ReactNode } from 'react';
import { HelmetProps } from 'react-helmet-async';

export type PageTemplateProps = {
    header?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;
    contentDescription?: string;
} & HelmetProps;
