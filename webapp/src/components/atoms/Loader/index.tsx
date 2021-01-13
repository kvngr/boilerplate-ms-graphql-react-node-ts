import { LoaderProps } from '@types';
import React, { FC, memo } from 'react';
import styled from 'styled-components';

const SLoader = styled.div``;

export const Loader: FC<LoaderProps> = memo((props) => <SLoader {...props}>...Loading</SLoader>);
