// Utility type to exclude undefined from a type
export type NonUndefined<T> = T extends undefined ? never : T;