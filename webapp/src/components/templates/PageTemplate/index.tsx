import { LanguageType, PageTemplateProps } from '@types';
import React, { FC, memo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export const PageTemplate: FC<PageTemplateProps> = memo(
    ({ header, title, children, footer, htmlAttributes, contentDescription, ...helmetProps }) => (
        <HelmetProvider>
            <Helmet {...helmetProps}>
                <meta charSet="utf-8" />
                <meta name="description" content={contentDescription} />
                <title>{title}</title>
                <html lang={htmlAttributes?.lang as LanguageType} />
            </Helmet>
            {header && <header>{header}</header>}
            {children}
            {footer && <footer>{footer}</footer>}
        </HelmetProvider>
    ),
);
