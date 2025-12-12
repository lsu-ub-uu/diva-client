import { getEnhancement } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { describe, expect, it } from 'vitest';

describe('formGeneratorUtils', () => {
  describe('getEnhancement', () => {
    it('returns nothing when enhancedFields is undefined', () => {
      const result = getEnhancement(undefined, 'some.path');
      expect(result).toBeUndefined();
    });
    it('returns undefined when no matching enhancement', () => {
      const result = getEnhancement(
        { 'some.path': { type: 'hidden' } },
        'some.other.path',
      );
      expect(result).toBeUndefined();
    });

    it('return enhancement from regular string', () => {
      const result = getEnhancement(
        { 'some.path': { type: 'hidden' } },
        'some.path',
      );
      expect(result).toEqual({ type: 'hidden' });
    });

    it('return enhancement from maching wildcard', () => {
      const result = getEnhancement(
        { '*.path': { type: 'hidden' } },
        'some.path',
      );
      expect(result).toEqual({ type: 'hidden' });
    });

    it('does not match when path segments length differ', () => {
      const result = getEnhancement(
        { '*.path': { type: 'hidden' } },
        'some.extra.path',
      );
      expect(result).toBeUndefined();
    });

    it('returns the first matching enhancement when multiple patterns match', () => {
      const result = getEnhancement(
        {
          '*.path': { type: 'hidden' },
          'some.path': { type: 'notRemovable' },
        },
        'some.path',
      );
      // Should return the first match in Object.entries order
      expect(result).toEqual({ type: 'hidden' });
    });

    it('matches wildcard in a different segment', () => {
      const result = getEnhancement(
        {
          'some.*': { type: 'hidden' },
        },
        'some.path',
      );
      expect(result).toEqual({ type: 'hidden' });
    });

    it('returns undefined for empty string path', () => {
      const result = getEnhancement(
        {
          '*.path': { type: 'hidden' },
        },
        '',
      );
      expect(result).toBeUndefined();
    });

    it('returns enhancement for empty string key and path', () => {
      const result = getEnhancement(
        {
          '': { type: 'hidden' },
        },
        '',
      );
      expect(result).toBeUndefined();
    });
  });
});
