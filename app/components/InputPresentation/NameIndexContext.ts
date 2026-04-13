import { createContext } from 'react';

export type NameIndexMap = Map<string, number>;

export const NameIndexContext = createContext<NameIndexMap>(new Map());
