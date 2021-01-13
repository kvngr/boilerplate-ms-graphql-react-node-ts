import { OptionProps } from '@types';
import React, { FC, memo } from 'react';
import styled from 'styled-components';

const SOption = styled.option``;

export const Option: FC<OptionProps> = memo(({ label, value }) => <SOption value={value}>{label}</SOption>);
