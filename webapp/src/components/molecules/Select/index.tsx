import { Option } from '@components';
import { SelectProps } from '@types';
import { hasProp } from '@utils';
import React, { FC, memo } from 'react';
import styled from 'styled-components';

const SSelect = styled.select``;

export const Select: FC<SelectProps> = memo((props) => {
    const { options, children, ...rest } = props;
    if (hasProp('options', props)) {
        return (
            <SSelect {...rest}>
                {options?.map(({ value, label }, key) => (
                    <Option key={key} label={label} value={value} />
                ))}
            </SSelect>
        );
    }
    return <SSelect>{children}</SSelect>;
});
