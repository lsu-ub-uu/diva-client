import { describe, expect, it } from 'vitest';
import { getValueForRepeat } from '../getValueForRepeat';

describe('getValueForRepeat', () => {
  it('should return the correct value for a 1-1', () => {
    expect(getValueForRepeat('{ value: string; }', '1', '1')).toStrictEqual(
      '{ value: string; }',
    );
  });

  it('should return the correct value for a 0-1', () => {
    expect(getValueForRepeat('{ value: string; }', '0', '1')).toStrictEqual(
      '{ value: string; }',
    );
  });

  it('should return the correct value for a 0-X', () => {
    expect(getValueForRepeat('{ value: string; }', '0', 'X')).toStrictEqual(
      '{ value: string; }[]',
    );
  });

  it('should return the correct value for a 1-X', () => {
    expect(getValueForRepeat('{ value: string; }', '1', 'X')).toStrictEqual(
      '{ value: string; }[]',
    );
  });
});
