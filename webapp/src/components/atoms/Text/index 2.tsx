import { TextProps } from '@types';
import React, { FC, memo } from 'react';
import styled from 'styled-components';

const SParagraph = styled.p``;
const SSpan = styled.span``;
const Slabel = styled.label``;

export const Text: FC<TextProps> = memo(({ type, label, children, ...rest }) => {
    switch (type) {
        case 'p' || 'paragraph':
            return (
                <SParagraph {...rest}>
                    {label}
                    {children}
                </SParagraph>
            );
        case 'span':
            return (
                <SSpan {...rest}>
                    {label}
                    {children}
                </SSpan>
            );
        case 'label':
            return (
                <Slabel {...rest}>
                    {label}
                    {children}
                </Slabel>
            );
        default:
            return (
                <SParagraph {...rest}>
                    {label}
                    {children}
                </SParagraph>
            );
    }
});
