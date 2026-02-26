import type { Dependencies } from '@/cora/bffTypes.server';
import { describe, expect, it, vi } from 'vitest';
import { createActiveFilters } from '../createActiveFilters.server';
import type { SearchFormDefinition } from '../createSearchFormDefinition.server';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId.server';
import type { BFFDataRecord, BFFDataRecordData } from '@/types/record';

vi.mock('@/data/getRecordByRecordTypeAndRecordId.server');

describe('createActiveFilters', () => {
  it('creates active filters for basic filters', async () => {
    const searchFormDefinition = {
      filters: [
        {
          name: 'filter1',
          textId: 'filter1Text',
          type: 'text',
        },
        { name: 'filter2', textId: 'filter2Text', type: 'text' },
        { name: 'filter3', textId: 'filter3Text', type: 'text' },
      ],
    } as SearchFormDefinition;
    const searchParams = new URLSearchParams();
    searchParams.set('filter1', 'value1');
    searchParams.set('filter2', 'value2');
    const dependencies = {} as Dependencies;
    const auth = undefined;
    const language = 'en';

    const result = await createActiveFilters(
      searchFormDefinition,
      searchParams,
      dependencies,
      auth,
      language,
    );

    expect(result).toEqual([
      {
        name: 'filter1',
        value: 'value1',
        textId: 'filter1Text',
        valueTextId: 'value1',
      },
      {
        name: 'filter2',
        value: 'value2',
        textId: 'filter2Text',
        valueTextId: 'value2',
      },
    ]);
  });

  it('creates active filters for a collection filter', async () => {
    const searchFormDefinition = {
      filters: [
        {
          name: 'filter1',
          textId: 'filter1Text',
          type: 'collection',
          options: [
            { value: 'value1', text: 'Value 1' },
            { value: 'value2', text: 'Value 2' },
          ],
        },
        { name: 'filter2', textId: 'filter2Text', type: 'text' },
        { name: 'filter3', textId: 'filter3Text', type: 'text' },
      ],
    } as SearchFormDefinition;
    const searchParams = new URLSearchParams();
    searchParams.set('filter1', 'value2');

    const dependencies = {} as Dependencies;
    const auth = undefined;
    const language = 'en';

    const result = await createActiveFilters(
      searchFormDefinition,
      searchParams,
      dependencies,
      auth,
      language,
    );

    expect(result).toEqual([
      {
        name: 'filter1',
        value: 'value2',
        textId: 'filter1Text',
        valueTextId: 'Value 2',
      },
    ]);
  });

  it('creates active filters for an autocomplete filter', async () => {
    vi.mocked(getRecordByRecordTypeAndRecordId).mockResolvedValue({
      data: {
        root: {
          titleEn: { value: 'Value 2' },
          titleSv: { value: 'Värde 2' },
        },
      } as BFFDataRecordData,
    } as BFFDataRecord<BFFDataRecordData>);

    const searchFormDefinition = {
      filters: [
        {
          name: 'filter1',
          textId: 'filter1Text',
          type: 'autocomplete',
          presentationPath: {
            sv: 'root.titleSv.value',
            en: 'root.titleEn.value',
          },
        },
        { name: 'filter2', textId: 'filter2Text', type: 'text' },
        { name: 'filter3', textId: 'filter3Text', type: 'text' },
      ],
    } as SearchFormDefinition;
    const searchParams = new URLSearchParams();
    searchParams.set('filter1', 'someRecordType_someRecordId');

    const dependencies = {} as Dependencies;
    const auth = undefined;
    const language = 'sv';

    const result = await createActiveFilters(
      searchFormDefinition,
      searchParams,
      dependencies,
      auth,
      language,
    );

    expect(result).toEqual([
      {
        name: 'filter1',
        value: 'someRecordType_someRecordId',
        textId: 'filter1Text',
        valueTextId: 'Värde 2',
      },
    ]);
  });

  it('valueText falls back to value when autocomplete filter value is malformed', async () => {
    vi.mocked(getRecordByRecordTypeAndRecordId).mockResolvedValue({
      data: {
        root: {
          titleEn: { value: 'Value 2' },
          titleSv: { value: 'Värde 2' },
        },
      } as BFFDataRecordData,
    } as BFFDataRecord<BFFDataRecordData>);

    const searchFormDefinition = {
      filters: [
        {
          name: 'filter1',
          textId: 'filter1Text',
          type: 'autocomplete',
          presentationPath: {
            sv: 'root.titleSv.value',
            en: 'root.titleEn.value',
          },
        },
        { name: 'filter2', textId: 'filter2Text', type: 'text' },
        { name: 'filter3', textId: 'filter3Text', type: 'text' },
      ],
    } as SearchFormDefinition;
    const searchParams = new URLSearchParams();
    searchParams.set('filter1', 'noUnderscoreHere');

    const dependencies = {} as Dependencies;
    const auth = undefined;
    const language = 'sv';

    const result = await createActiveFilters(
      searchFormDefinition,
      searchParams,
      dependencies,
      auth,
      language,
    );

    expect(result).toEqual([
      {
        name: 'filter1',
        value: 'noUnderscoreHere',
        textId: 'filter1Text',
        valueTextId: 'noUnderscoreHere',
      },
    ]);
  });

  it('valueText falls back to value when failing to fetch record', async () => {
    vi.mocked(getRecordByRecordTypeAndRecordId).mockImplementation(() => {
      throw new Error('Failed to fetch record');
    });

    const searchFormDefinition = {
      filters: [
        {
          name: 'filter1',
          textId: 'filter1Text',
          type: 'autocomplete',
          presentationPath: {
            sv: 'root.titleSv.value',
            en: 'root.titleEn.value',
          },
        },
        { name: 'filter2', textId: 'filter2Text', type: 'text' },
        { name: 'filter3', textId: 'filter3Text', type: 'text' },
      ],
    } as SearchFormDefinition;
    const searchParams = new URLSearchParams();
    searchParams.set('filter1', 'someRecordType_someRecordId');

    const dependencies = {} as Dependencies;
    const auth = undefined;
    const language = 'sv';

    const result = await createActiveFilters(
      searchFormDefinition,
      searchParams,
      dependencies,
      auth,
      language,
    );

    expect(result).toEqual([
      {
        name: 'filter1',
        value: 'someRecordType_someRecordId',
        textId: 'filter1Text',
        valueTextId: 'someRecordType_someRecordId',
      },
    ]);
  });
});
