import { describe, expect, it } from 'vitest';
import { generateInterfaceName } from '../generateInterfaceName';

describe('generateDivaRecordDataTypes', () => {
  it('should generate data types for DivaRecord', () => {
    expect(generateInterfaceName('diva-foo')).toBe('DivaFoo');
  });
});
