import { describe, expect, it } from 'vitest';
import { mapISO639_2b_to_ISO639_1 } from '../mapLanguageCode';

describe('mapISO639_2b_to_ISO639_1', () => {
  it('returns the correct ISO 639-1 code for a given ISO 639-2b code', () => {
    expect(mapISO639_2b_to_ISO639_1('eng')).toBe('en');
    expect(mapISO639_2b_to_ISO639_1('fre')).toBe('fr');
    expect(mapISO639_2b_to_ISO639_1('ger')).toBe('de');
    expect(mapISO639_2b_to_ISO639_1('spa')).toBe('es');
    expect(mapISO639_2b_to_ISO639_1('alb')).toBe('sq');
  });

  it('returns the ISO 639-2b code if no corresponding ISO 639-1 code is found', () => {
    expect(mapISO639_2b_to_ISO639_1('btk')).toBe('btk');
    expect(mapISO639_2b_to_ISO639_1('tlh')).toBe('tlh');
  });
});
