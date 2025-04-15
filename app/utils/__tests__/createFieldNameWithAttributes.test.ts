/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { createFieldNameWithAttributes } from '@/utils/createFieldNameWithAttributes';
import { describe, expect, it } from 'vitest';

describe('createFieldNameWithAttributes', () => {
  it('returns only name when no attributes', () => {
    const actual = createFieldNameWithAttributes('someName', []);
    expect(actual).toBe('someName');
  });

  it('returns name with attribute when one attributes', () => {
    const actual = createFieldNameWithAttributes('someName', [
      { name: 'someAttr', value: 'someValue' },
    ]);
    expect(actual).toBe('someName_someAttr_someValue');
  });

  it('returns name with attribute when multiple attributes', () => {
    const actual = createFieldNameWithAttributes('someName', [
      { name: 'someAttr', value: 'someValue' },
      { name: 'someAttr2', value: 'someValue2' },
      { name: 'someAttr3', value: 'someValue3' },
    ]);
    expect(actual).toBe(
      'someName_someAttr_someValue_someAttr2_someValue2_someAttr3_someValue3',
    );
  });

  it('replaces dots with dashes in attribute value', () => {
    const actual = createFieldNameWithAttributes('someName', [
      { name: 'someAttr', value: 'some.Value.aaa' },
    ]);
    expect(actual).toBe('someName_someAttr_some-Value-aaa');
  });

  it('ignores attributes with no value', () => {
    const actual = createFieldNameWithAttributes('someName', [
      { name: 'someAttr', value: 'someValue' },
      { name: 'someAttr2', value: undefined },
    ]);
    expect(actual).toBe('someName_someAttr_someValue');
  });

  it('sorts attributes alphabetically', () => {
    const actual = createFieldNameWithAttributes('language', [
      { name: 'type', value: 'code' },
      { name: 'authority', value: 'iso639-2b' },
    ]);
    expect(actual).toBe('language_authority_iso639-2b_type_code');
  });
});
