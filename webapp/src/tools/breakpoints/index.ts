import { Breakpoints, WindowSize } from '@types';
import { css, DefaultTheme, ThemedCssFunction } from 'styled-components';

export const breakpoints: Breakpoints = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
};

export const respondTo = (Object.keys(breakpoints) as WindowSize[]).reduce((accumulator, label) => {
    accumulator[label] = (first: any, ...interpolations: any[]) => css`
        @media (min-width: ${breakpoints[label]}px) {
            ${css(first, ...interpolations)}
        }
    `;
    return accumulator;
}, {} as { [key in keyof typeof breakpoints]: ThemedCssFunction<DefaultTheme> });
