import { ReactNode } from 'react';

type Paragraph = 'p' | 'paragraph';

type TextType = Paragraph | 'span' | 'label';

export type TextProps = {
    type?: TextType;
    label?: string;
    children: ReactNode;
};
