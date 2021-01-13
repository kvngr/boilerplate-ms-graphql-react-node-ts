import { InputProps } from '@types';
import React, { forwardRef, memo } from 'react';
import styled from 'styled-components';

type Ref = HTMLInputElement;

const SInput = styled.input``;

export const Input = memo(
    forwardRef<Ref, InputProps>((props, ref) => <SInput ref={ref} {...props} />),
);
