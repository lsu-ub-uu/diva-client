import { listToPool } from 'server/dependencies/util/listToPool';
import { Lookup } from 'server/dependencies/util/lookup';
import { describe, expect, it } from 'vitest';
import { createRecordLinkSearchPresentation } from '../createPresentation/createRecordLinkSearchPresentation.server';
import type { Dependencies } from '@/cora/bffTypes.server';

describe('createRecordLinkSearchPresentation', () => {
  it('creates a record link search presentation with the first search term as autocomplete search term', () => {
    const dependencies = {
      searchPool: listToPool([
        { id: 'searchType', metadataId: 'searchGroupId' },
      ]),
      metadataPool: listToPool([
        {
          id: 'searchGroupId',
          nameInData: 'searchGroup',
          children: [{ childId: 'includeGroupId' }],
        },
        {
          id: 'includeGroupId',
          nameInData: 'includeGroup',
          children: [{ childId: 'includePartGroupId' }],
        },
        {
          id: 'includePartGroupId',
          nameInData: 'includePartGroup',
          children: [
            { childId: 'genericSearchTermId', repeatMin: '0' },
            { childId: 'someOtherSearchTermId', repeatMin: '0' },
          ],
        },
        {
          id: 'genericSearchTermId',
          nameInData: 'genericSearchTerm',
        },
        {
          id: 'someOtherSearchTermId',
          nameInData: 'someOtherSearchTerm',
        },
      ]),
    } as Dependencies;

    const searchType = 'searchType';
    const result = createRecordLinkSearchPresentation(dependencies, searchType);

    expect(result).toStrictEqual({
      autocompleteSearchTerm: {
        name: 'searchGroup.includeGroup.includePartGroup.genericSearchTerm[0].value',
      },
      searchType: 'searchType',
    });
  });

  it('creates a record link search presentation with permission unit search term', () => {
    const dependencies = {
      searchPool: listToPool([
        { id: 'searchType', metadataId: 'searchGroupId' },
      ]),
      metadataPool: listToPool([
        {
          id: 'searchGroupId',
          nameInData: 'searchGroup',
          children: [{ childId: 'includeGroupId' }],
        },
        {
          id: 'includeGroupId',
          nameInData: 'includeGroup',
          children: [{ childId: 'includePartGroupId' }],
        },
        {
          id: 'includePartGroupId',
          nameInData: 'includePartGroup',
          children: [
            { childId: 'genericSearchTermId', repeatMin: '0' },
            { childId: 'someOtherSearchTermId', repeatMin: '0' },
            { childId: 'permissionUnitSearchTermId', repeatMin: '0' },
          ],
        },
        {
          id: 'genericSearchTermId',
          nameInData: 'genericSearchTerm',
        },
        {
          id: 'permissionUnitSearchTermId',
          nameInData: 'permissionUnitSearchTerm',
        },
        {
          id: 'someOtherSearchTermId',
          nameInData: 'someOtherSearchTerm',
        },
      ]),
    } as Dependencies;

    const searchType = 'searchType';
    const result = createRecordLinkSearchPresentation(dependencies, searchType);

    expect(result).toStrictEqual({
      autocompleteSearchTerm: {
        name: 'searchGroup.includeGroup.includePartGroup.genericSearchTerm[0].value',
      },
      permissionUnitSearchTerm: {
        name: 'searchGroup.includeGroup.includePartGroup.permissionUnitSearchTerm[0].value',
      },
      searchType: 'searchType',
    });
  });

  it('returns undefined when no search metadata', () => {
    const dependencies = {
      searchPool: listToPool([
        { id: 'searchType', metadataId: 'searchGroupId' },
      ]),
      metadataPool: new Lookup(),
    } as Dependencies;

    const searchType = 'searchType';
    const result = createRecordLinkSearchPresentation(dependencies, searchType);

    expect(result).toBeUndefined();
  });

  it('returns undefined when no include group in metadata', () => {
    const dependencies = {
      searchPool: listToPool([
        { id: 'searchType', metadataId: 'searchGroupId' },
      ]),
      metadataPool: listToPool([
        {
          id: 'searchGroupId',
          nameInData: 'searchGroup',
          children: [{ childId: 'someOtherChildId' }],
        },
      ]),
    } as Dependencies;

    const searchType = 'searchType';
    const result = createRecordLinkSearchPresentation(dependencies, searchType);

    expect(result).toBeUndefined();
  });

  it('returns undefined when no include part group in metadata', () => {
    const dependencies = {
      searchPool: listToPool([
        { id: 'searchType', metadataId: 'searchGroupId' },
      ]),
      metadataPool: listToPool([
        {
          id: 'searchGroupId',
          nameInData: 'searchGroup',
          children: [{ childId: 'includeGroupId' }],
        },
        {
          id: 'includeGroupId',
          nameInData: 'includeGroup',
          children: [{ childId: 'someOtherId' }],
        },
      ]),
    } as Dependencies;

    const searchType = 'searchType';
    const result = createRecordLinkSearchPresentation(dependencies, searchType);

    expect(result).toBeUndefined();
  });
});
