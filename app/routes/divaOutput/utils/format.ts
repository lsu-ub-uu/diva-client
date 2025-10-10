import type { IdentifierDisplayLabelIsbnIsmnCollection } from '@/generatedTypes/divaTypes';

export interface IsbnIsmn {
  value: string;
  _type: 'isbn' | 'ismn';
  _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
  __text: { sv: string; en: string };
}

export const formatIsbnIsmnLabel = (
  identifier: IsbnIsmn,
  language: 'sv' | 'en',
): string => {
  return `${identifier.__text[language]} (${identifier._displayLabel})`;
};
