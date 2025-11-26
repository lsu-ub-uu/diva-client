import type { IdentifierDisplayLabelIsbnIsmnCollection } from '@/generatedTypes/divaTypes';

export interface IsbnIsmn {
  _displayLabel: IdentifierDisplayLabelIsbnIsmnCollection;
  __text?: { sv: string; en: string };
}

export const formatIsbnIsmnLabel = (
  identifier: IsbnIsmn,
  language: 'sv' | 'en',
): string => {
  return `${identifier.__text?.[language]} (${identifier._displayLabel})`;
};

export const formatTimestamp = (
  timestamp: string | undefined,
  language: 'sv' | 'en',
) => {
  if (!timestamp) {
    return undefined;
  }
  const date = new Date(timestamp);
  return date.toLocaleString(language === 'sv' ? 'sv-SE' : 'en-GB');
};

export const formatBytes = (bytesString?: string): string => {
  if (!bytesString) return '';
  const bytes = parseInt(bytesString, 10);
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
