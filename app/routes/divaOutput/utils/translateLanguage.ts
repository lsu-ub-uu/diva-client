import type { LanguageCollection } from '@/generatedTypes/divaTypes';

export const getLanguageTextId = (languageCode: LanguageCollection): string => {
  return `${languageCode}LangItemText`;
};
