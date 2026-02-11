import { describe, expect, it } from 'vitest';
import { createSearchQuery } from '../createSearchQuery.server';
import type { SearchFormDefinition } from '../createSearchFormDefinition.server';
import type { ActiveFilter } from '../createActiveFilters.server';
import type { BFFMember } from '@/cora/transform/bffTypes.server';

describe('createSearchQuery', () => {
  it('creates a basic query', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: { nameInData: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = 'test query';
    const member = undefined;
    const activeFilters = [] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      member,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            recordIdSearchTerm: { value: '**' },
            trashBinSearchTerm: { value: 'false' },
            permissionUnitSearchTerm: { value: '' },
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
      mainSearchTerm: { nameInData: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = 'test query';
    const member = undefined;
    const activeFilters = [] as ActiveFilter[];
    const start = 40;
    const rows = 20;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      member,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            recordIdSearchTerm: { value: '**' },
            trashBinSearchTerm: { value: 'false' },
            permissionUnitSearchTerm: { value: '' },
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
      mainSearchTerm: { nameInData: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = '';
    const member = undefined;
    const activeFilters = [] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      member,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            recordIdSearchTerm: { value: '**' },
            trashBinSearchTerm: { value: 'false' },
            permissionUnitSearchTerm: { value: '' },
            mainSearchTerm: { value: '**' },
          },
        },
        start: { value: '0' },
        rows: { value: '10' },
      },
    });
  });

  it('searches within member permission unit', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: { nameInData: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = 'test query';
    const member = {
      memberPermissionUnit: 'memberPermissionUnit',
    } as BFFMember;
    const activeFilters = [] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      member,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            recordIdSearchTerm: { value: '**' },
            trashBinSearchTerm: { value: 'false' },
            permissionUnitSearchTerm: {
              value: 'permissionUnit_memberPermissionUnit',
            },
            mainSearchTerm: { value: 'test query' },
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
      mainSearchTerm: { nameInData: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = 'test query';
    const member = undefined;
    const activeFilters = [
      { name: 'filter1', value: 'value1' },
      { name: 'filter2', value: 'value2' },
    ] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      member,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            recordIdSearchTerm: { value: '**' },
            trashBinSearchTerm: { value: 'false' },
            permissionUnitSearchTerm: { value: '' },
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

  it('is possible to override trashBinSearchTerm and permissionUnitSearchTerm', () => {
    const searchFormDefinition = {
      searchRootName: 'testSearch',
      mainSearchTerm: { nameInData: 'mainSearchTerm' },
    } as SearchFormDefinition;
    const q = 'test query';
    const member = {
      memberPermissionUnit: 'memberPermissionUnit',
    } as BFFMember;
    const activeFilters = [
      { name: 'trashBinSearchTerm', value: 'true' },
      { name: 'permissionUnitSearchTerm', value: 'permissionUnit_test' },
    ] as ActiveFilter[];
    const start = 0;
    const rows = 10;

    const query = createSearchQuery(
      searchFormDefinition,
      q,
      member,
      activeFilters,
      start,
      rows,
    );

    expect(query).toEqual({
      testSearch: {
        include: {
          includePart: {
            recordIdSearchTerm: { value: '**' },
            trashBinSearchTerm: { value: 'true' },
            permissionUnitSearchTerm: { value: 'permissionUnit_test' },
            mainSearchTerm: { value: 'test query' },
          },
        },
        start: { value: '0' },
        rows: { value: '10' },
      },
    });
  });
});
