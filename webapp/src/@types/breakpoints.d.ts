export type WindowSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Breakpoints = {
    [key in WindowSize]: number;
};
