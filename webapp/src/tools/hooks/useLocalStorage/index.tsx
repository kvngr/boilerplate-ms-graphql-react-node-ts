import { LocalStorageType } from '@types';
import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, value?: T): LocalStorageType<T> {
    const [storedValue, setStoredValue] = useState<T | undefined>(() => {
        if (!value) return;
        try {
            const computedValue = localStorage.getItem(key);
            return computedValue ? JSON.parse(computedValue) : value;
        } catch (error) {
            console.warn(error);
            return value;
        }
    });

    useEffect(() => {
        if (storedValue) {
            try {
                localStorage.setItem(key, JSON.stringify(storedValue));
            } catch (error) {
                console.warn(error);
            }
        }
    }, [storedValue, key]);

    return [storedValue, setStoredValue];
}
