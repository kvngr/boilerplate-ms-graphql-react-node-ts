import { SelectHTMLAttributes } from 'react';

import { OptionProps } from './option';

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options?: OptionProps[];
};
