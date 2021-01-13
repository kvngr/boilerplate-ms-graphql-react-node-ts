import { OptionHTMLAttributes } from 'react';

type OProps = {
    label: string;
    value: string;
};

export type OptionProps = OptionHTMLAttributes<HTMLOptionElement> & OProps;
