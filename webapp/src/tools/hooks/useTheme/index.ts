import { Theme } from '@types';
import { useCallback, useEffect, useState } from 'react';

import { useLocalStorage } from '../useLocalStorage';

export const themes = {
    light: 'light',
    dark: 'dark',
};

export function useTheme() {
    const [theme, setCurrentTheme] = useState<Theme>('light');

    const [storedTheme, setStoredTheme] = useLocalStorage<Theme>('theme', theme);

    const setTheme = useCallback(
        (value: Theme) => {
            const theme = themes[value] as Theme;
            setStoredTheme(value);
            setCurrentTheme(theme);
        },
        [setStoredTheme],
    );

    useEffect(() => {
        if (storedTheme) {
            setTheme(storedTheme);
            document.body.dataset.theme = storedTheme;
        } else {
            setTheme(theme);
            document.body.dataset.theme = theme;
        }
    }, [theme, storedTheme, setTheme]);

    return {
        setTheme,
        theme,
    };
}
