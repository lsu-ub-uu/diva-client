import { describe, expect, it } from 'vitest';
import { validateSearchFormData } from '../validateSearchFormData.server';
import type { SearchFormDefinition } from '../createSearchFormDefinition.server';
import type { BFFMetadataTextVariable } from '@/cora/bffTypes.server';

describe('validateSearchFormData', () => {
  it('returns validation error when q does not match regex', () => {
    const searchFormDefinition: SearchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: {
        nameInData: 'mainSearchTerm',
        regEx: '^[A-z]+$',
      } as BFFMetadataTextVariable,
      filters: [],
    };

    const errors = validateSearchFormData('123', [], searchFormDefinition);

    expect(errors.get('mainSearchTerm')).toBe(
      'divaClient_invalidSearchTermText',
    );
  });

  it('returns no validation error when q matches regex', () => {
    const searchFormDefinition: SearchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: {
        nameInData: 'mainSearchTerm',
        regEx: '^[A-z]+$',
      } as BFFMetadataTextVariable,
      filters: [],
    };

    const errors = validateSearchFormData('abc', [], searchFormDefinition);

    expect(errors.size).toBe(0);
  });

  it('does not return error if q is empty', () => {
    const searchFormDefinition: SearchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: {
        nameInData: 'mainSearchTerm',
        regEx: '^[A-z]+$',
      } as BFFMetadataTextVariable,
      filters: [],
    };

    const errors = validateSearchFormData('', [], searchFormDefinition);

    expect(errors.size).toBe(0);
  });

  it('returns error when filter value does not match regex', () => {
    const searchFormDefinition: SearchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: {
        nameInData: 'mainSearchTerm',
        regEx: '^[A-z]+$',
      } as BFFMetadataTextVariable,
      filters: [
        {
          name: 'testFilter',
          textId: 'testFilterText',
          placeholderTextId: 'testFilterPlaceholder',
          type: 'text',
          repeat: { repeatMin: 0, repeatMax: 1 },
          id: 'testFilterId',
          regEx: '^[0-9]+$',
        },
      ],
    };

    const errors = validateSearchFormData(
      '',
      [
        {
          name: 'testFilter',
          textId: 'testFilterText',
          value: 'some value',
        },
      ],
      searchFormDefinition,
    );

    expect(errors.size).toBe(1);
    expect(errors.get('testFilter')).toBe('divaClient_invalidFilterValueText');
  });

  it('does not return error when filter value matches regex', () => {
    const searchFormDefinition: SearchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: {
        nameInData: 'mainSearchTerm',
        regEx: '^[A-z]+$',
      } as BFFMetadataTextVariable,
      filters: [
        {
          name: 'testFilter',
          textId: 'testFilterText',
          placeholderTextId: 'testFilterPlaceholder',
          type: 'text',
          repeat: { repeatMin: 0, repeatMax: 1 },
          id: 'testFilterId',
          regEx: '^[0-9]+$',
        },
      ],
    };

    const errors = validateSearchFormData(
      '',
      [
        {
          name: 'testFilter',
          textId: 'testFilterText',
          value: '12345',
        },
      ],
      searchFormDefinition,
    );

    expect(errors.size).toBe(0);
  });

  it('does not return error if filter is empty', () => {
    const searchFormDefinition: SearchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: {
        nameInData: 'mainSearchTerm',
        regEx: '^[A-z]+$',
      } as BFFMetadataTextVariable,
      filters: [
        {
          name: 'testFilter',
          textId: 'testFilterText',
          placeholderTextId: 'testFilterPlaceholder',
          type: 'text',
          repeat: { repeatMin: 0, repeatMax: 1 },
          id: 'testFilterId',
          regEx: '^[0-9]+$',
        },
      ],
    };

    const errors = validateSearchFormData(
      '',
      [
        {
          name: 'testFilter',
          textId: 'testFilterText',
          value: '',
        },
      ],
      searchFormDefinition,
    );

    expect(errors.size).toBe(0);
  });
});
