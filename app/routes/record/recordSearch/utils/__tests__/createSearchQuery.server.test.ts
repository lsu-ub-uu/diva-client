import { describe, expect, it } from 'vitest';
import { createSearchQuery } from '../createSearchQuery.server';
import type { SearchFormDefinition } from '../createSearchFormDefinition.server';
import type { ActiveFilter } from '../createActiveFilters.server';
import type { FilterDefinition } from '../createFilterDefinition.server';

describe('createSearchQuery', () => {
  it('creates a basic query', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: { name: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = 'test query';
    const defaultFilters: Record<string, string> = {};
    const activeFilters = [] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      defaultFilters,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            mainSearchTerm: { value: 'test query' },
          },
        },
        start: { value: '0' },
        rows: { value: '10' },
      },
    });
  });

  it('creates a search query with different start and rows', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: { name: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = 'test query';
    const defaultFilters: Record<string, string> = {};
    const activeFilters = [] as ActiveFilter[];
    const start = 40;
    const rows = 20;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      defaultFilters,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            mainSearchTerm: { value: 'test query' },
          },
        },
        start: { value: '40' },
        rows: { value: '20' },
      },
    });
  });

  it('Searches for ** when q is empty', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: { name: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = '';
    const defaultFilters: Record<string, string> = {};
    const activeFilters = [] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      defaultFilters,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            mainSearchTerm: { value: '**' },
          },
        },
        start: { value: '0' },
        rows: { value: '10' },
      },
    });
  });

  it('searches using default filters', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: { name: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = 'test query';
    const defaultFilters: Record<string, string> = {
      visibilitySearchTerm: 'published',
      permissionUnitLinkedRecordIdSearchTerm: 'permissionUnit_memberPermissionUnit',
    };
    const activeFilters = [] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      defaultFilters,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            mainSearchTerm: { value: 'test query' },
            visibilitySearchTerm: { value: 'published' },
            permissionUnitLinkedRecordIdSearchTerm: {
              value: 'permissionUnit_memberPermissionUnit',
            },
          },
        },
        start: { value: '0' },
        rows: { value: '10' },
      },
    });
  });

  it('searches for active filters', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: { name: 'mainSearchTerm' },
      filters: [] as FilterDefinition[],
    } as SearchFormDefinition;
    const q = 'test query';
    const defaultFilters: Record<string, string> = {};
    const activeFilters = [
      { name: 'filter1', value: 'value1' },
      { name: 'filter2', value: 'value2' },
    ] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      defaultFilters,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            mainSearchTerm: { value: 'test query' },
            filter1: { value: 'value1' },
            filter2: { value: 'value2' },
          },
        },
        start: { value: '0' },
        rows: { value: '10' },
      },
    });
  });

  it('sets filter values as array when repeatMax is larger than 1', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: {
        name: 'mainSearchTerm',
      },
      filters: [
        {
          id: 'testFilter',
          name: 'testFilter',
          labelTextId: 'testFilterTextId',
          placeholderTextId: 'testFilterPlaceholderTextId',
          repeat: {
            repeatMin: 0,
            repeatMax: Number.MAX_VALUE,
          },
        },
      ],
    } as SearchFormDefinition;
    const q = 'test query';
    const defaultFilters: Record<string, string> = {};
    const activeFilters = [
      {
        name: 'testFilter',
        value: 'testValue',
      },
    ] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      defaultFilters,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            mainSearchTerm: { value: 'test query' },
            testFilter: [{ value: 'testValue' }],
          },
        },
        start: { value: '0' },
        rows: { value: '10' },
      },
    });
  });
});
