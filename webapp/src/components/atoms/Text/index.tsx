import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

type Paragraph = 'p' | 'paragraph';

type TextType = Paragraph | 'span' | 'label';

type Props = {
    type?: TextType;
    label?: string;
    children: ReactNode;
};

const SParagraph = styled.p``;
const SSpan = styled.span``;
const Slabel = styled.label``;

export const Text: FC<Props> = ({ type, label, children, ...rest }) => {
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
};
