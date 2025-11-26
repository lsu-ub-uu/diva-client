import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import type { IdentifierDisplayLabelIsbnIsmnCollection } from '@/generatedTypes/divaTypes';
import {
  formatIsbnIsmnLabel,
  formatTimestamp,
  formatBytes,
  type IsbnIsmn,
} from '../format';

describe('formatIsbnIsmnLabel', () => {
  it('formats ISBN/ISMN with Swedish text and display label', () => {
    const identifier: IsbnIsmn = {
      _displayLabel: 'print',
      __text: { sv: '978-91-000-0000-0', en: '978-91-000-0000-0' },
    };

    const result = formatIsbnIsmnLabel(identifier, 'sv');
    expect(result).toBe('978-91-000-0000-0 (print)');
  });

  it('formats ISBN/ISMN with English text and display label', () => {
    const identifier: IsbnIsmn = {
      _displayLabel: 'online',
      __text: { sv: '978-91-000-0000-0', en: '978-91-000-0000-0' },
    };

    const result = formatIsbnIsmnLabel(identifier, 'en');
    expect(result).toBe('978-91-000-0000-0 (online)');
  });

  it('formats with different text for different languages', () => {
    const identifier: IsbnIsmn = {
      _displayLabel: 'undefined',
      __text: { sv: 'Svenska texten', en: 'English text' },
    };

    const svResult = formatIsbnIsmnLabel(identifier, 'sv');
    const enResult = formatIsbnIsmnLabel(identifier, 'en');

    expect(svResult).toBe('Svenska texten (undefined)');
    expect(enResult).toBe('English text (undefined)');
  });

  it('handles missing text with undefined', () => {
    const identifier: IsbnIsmn = {
      _displayLabel: 'invalid',
    };

    const result = formatIsbnIsmnLabel(identifier, 'sv');
    expect(result).toBe('undefined (invalid)');
  });

  it('handles all possible display label values', () => {
    const displayLabels: IdentifierDisplayLabelIsbnIsmnCollection[] = [
      'print',
      'online',
      'undefined',
      'invalid',
    ];

    displayLabels.forEach((label) => {
      const identifier: IsbnIsmn = {
        _displayLabel: label,
        __text: { sv: 'test-text', en: 'test-text' },
      };

      const result = formatIsbnIsmnLabel(identifier, 'sv');
      expect(result).toBe(`test-text (${label})`);
    });
  });
});

describe('formatTimestamp', () => {
  beforeEach(() => {
    vi.stubGlobal('Intl', {
      ...Intl,
      DateTimeFormat: vi.fn().mockImplementation((locale, options) => {
        const originalFormatter = new Intl.DateTimeFormat(locale, options);
        return {
          ...originalFormatter,
          format: vi.fn((date) => originalFormatter.format(date)),
        };
      }),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('formats timestamp for Swedish locale', () => {
    const timestamp = '2023-12-25T14:30:00.000Z';
    const result = formatTimestamp(timestamp, 'sv');

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    if (result) {
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it('formats timestamp for English locale', () => {
    const timestamp = '2023-12-25T14:30:00.000Z';
    const result = formatTimestamp(timestamp, 'en');

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    if (result) {
      expect(result.length).toBeGreaterThan(0);
    }
  });

  it('returns undefined for undefined timestamp', () => {
    const result = formatTimestamp(undefined, 'sv');
    expect(result).toBeUndefined();
  });

  it('returns undefined for empty string timestamp', () => {
    const result = formatTimestamp('', 'sv');
    expect(result).toBeUndefined();
  });

  it('handles different timestamp formats', () => {
    const timestamps = [
      '2023-12-25T14:30:00Z',
      '2023-12-25T14:30:00.123Z',
      '2023-12-25T14:30:00+02:00',
      '2023-12-25 14:30:00',
    ];

    timestamps.forEach((timestamp) => {
      const result = formatTimestamp(timestamp, 'sv');
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      if (result) {
        expect(result.length).toBeGreaterThan(0);
      }
    });
  });

  it('handles invalid timestamp gracefully', () => {
    const invalidTimestamp = 'not-a-date';
    const result = formatTimestamp(invalidTimestamp, 'sv');

    expect(typeof result).toBe('string');
  });

  it('produces different output for different locales', () => {
    const timestamp = '2023-12-25T14:30:00.000Z';
    const svResult = formatTimestamp(timestamp, 'sv');
    const enResult = formatTimestamp(timestamp, 'en');

    expect(svResult).toBeDefined();
    expect(enResult).toBeDefined();
    expect(typeof svResult).toBe('string');
    expect(typeof enResult).toBe('string');
  });
});

describe('formatBytes', () => {
  it('returns empty string for undefined input', () => {
    const result = formatBytes(undefined);
    expect(result).toBe('');
  });

  it('returns empty string for empty string input', () => {
    const result = formatBytes('');
    expect(result).toBe('');
  });

  it('formats zero bytes', () => {
    const result = formatBytes('0');
    expect(result).toBe('0 B');
  });

  it('formats bytes (less than 1024)', () => {
    expect(formatBytes('1')).toBe('1 B');
    expect(formatBytes('512')).toBe('512 B');
    expect(formatBytes('1023')).toBe('1023 B');
  });

  it('formats kilobytes', () => {
    expect(formatBytes('1024')).toBe('1 KB');
    expect(formatBytes('1536')).toBe('1.5 KB');
    expect(formatBytes('2048')).toBe('2 KB');
    expect(formatBytes('1048575')).toBe('1024 KB');
  });

  it('formats megabytes', () => {
    expect(formatBytes('1048576')).toBe('1 MB');
    expect(formatBytes('1572864')).toBe('1.5 MB');
    expect(formatBytes('2097152')).toBe('2 MB');
    expect(formatBytes('1073741823')).toBe('1024 MB');
  });

  it('formats gigabytes', () => {
    expect(formatBytes('1073741824')).toBe('1 GB');
    expect(formatBytes('1610612736')).toBe('1.5 GB');
    expect(formatBytes('2147483648')).toBe('2 GB');
    expect(formatBytes('1099511627775')).toBe('1024 GB');
  });

  it('formats terabytes', () => {
    expect(formatBytes('1099511627776')).toBe('1 TB');
    expect(formatBytes('1649267441664')).toBe('1.5 TB');
    expect(formatBytes('2199023255552')).toBe('2 TB');
  });

  it('handles decimal values correctly', () => {
    expect(formatBytes('1536')).toBe('1.5 KB');
    expect(formatBytes('1638400')).toBe('1.56 MB');
    expect(formatBytes('1677721600')).toBe('1.56 GB');
  });

  it('handles string input with leading/trailing whitespace', () => {
    expect(formatBytes(' 1024 ')).toBe('1 KB');
    expect(formatBytes('\t2048\n')).toBe('2 KB');
  });

  it('handles invalid numeric strings', () => {
    expect(formatBytes('not-a-number')).toBe('0 B');
    expect(formatBytes('123abc')).toBe('123 B');
  });

  it('handles negative values', () => {
    expect(formatBytes('-1024')).toBe('0 B');
  });

  it('handles very large numbers', () => {
    const veryLargeNumber = '1125899906842624';
    const result = formatBytes(veryLargeNumber);
    expect(result).toBe('>1024 TB');
  });

  it('rounds to 2 decimal places maximum', () => {
    expect(formatBytes('1050')).toBe('1.03 KB');
    expect(formatBytes('1025')).toBe('1 KB');
  });
});
