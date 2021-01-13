import { TitleProps } from '@types';
import React, { FC, memo } from 'react';
import styled from 'styled-components';

const H1 = styled.h1``;
const H2 = styled.h2``;
const H3 = styled.h3``;
const H4 = styled.h4``;
const H5 = styled.h5``;
const H6 = styled.h6``;

export const Title: FC<TitleProps> = memo(({ type, ...rest }) => {
    switch (type) {
        case 'h1':
            return <H1 {...rest} />;
        case 'h2':
            return <H2 {...rest} />;
        case 'h3':
            return <H3 {...rest} />;
        case 'h4':
            return <H4 {...rest} />;
        case 'h5':
            return <H5 {...rest} />;
        case 'h6':
            return <H6 {...rest} />;
        default:
            return <H1 {...rest} />;
    }
});
