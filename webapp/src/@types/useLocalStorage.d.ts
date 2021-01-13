import { Dispatch, SetStateAction } from 'react';

export type LocalStorageType<T> = [T | undefined, Dispatch<SetStateAction<T | undefined>>];
