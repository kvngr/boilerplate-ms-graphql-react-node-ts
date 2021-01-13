import { ButtonProps } from '@types';
import { hasProp } from '@utils';
import React, { FC, memo } from 'react';
import styled from 'styled-components';

const SButton = styled.button``;

export const Button: FC<ButtonProps> = memo((props) => {
    const { children, label, ...rest } = props;
    if (hasProp('label', props)) {
        return (
            <SButton {...rest}>
                {label}
                {children}
            </SButton>
        );
    }
    return <SButton {...rest}>{children}</SButton>;
});
