import { expect, it, vi } from 'vitest';
import { describe } from 'vitest';
import { searchRecords } from '../searchRecords.server';
import type { Dependencies } from '../formDefinition/formDefinitionsDep.server';
import { Lookup } from '@/utils/structs/lookup';
import { listToPool } from '@/utils/structs/listToPool';
import type {
  BFFMetadata,
  BFFMetadataGroup,
  BFFMetadataTextVariable,
  BFFPresentation,
  BFFRecordType,
  BFFSearch,
} from '@/cora/transform/bffTypes.server';
import { getSearchResultDataListBySearchType } from '@/cora/getSearchResultDataListBySearchType.server';
import type { AxiosResponse } from 'axios';
import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import { transformRecords } from '@/cora/transform/transformRecord.server';
import { createLinkedRecordDefinition } from '../formDefinition/createLinkedRecordDefinition.server';
import type { FormSchema } from '@/components/FormGenerator/types';

vi.mock('@/cora/getSearchResultDataListBySearchType.server');
vi.mock('@/cora/transform/transformRecord.server');
vi.mock('@/data/formDefinition/createLinkedRecordDefinition.server');

describe('searchRecords', () => {
  it('throws an error when searchType not in pool', async () => {
    const dependencies = {
      searchPool: new Lookup(),
    } as Dependencies;

    await expect(
      searchRecords(dependencies, 'someSearchType', {}),
    ).rejects.toThrow('Search [someSearchType] does not exist');
  });

  it('searches and returns result with search result presentation', async () => {
    const dependencies = {
      searchPool: listToPool<BFFSearch>([
        {
          id: 'someSearch',
          metadataId: 'someSearchGroup',
          searchResultPresentation: 'someSearchResultPresentation',
        } as BFFSearch,
      ]),
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someSearchGroup',
          nameInData: 'search',
          children: [{ childId: 'fooTextVar' }],
        } as BFFMetadataGroup,
        {
          id: 'fooTextVar',
          nameInData: 'foo',
        } as BFFMetadataTextVariable,
        {
          id: 'someResultGroup',
          type: 'group',
          nameInData: 'someResultGroup',
          children: [{ childId: 'someResultTextVar' }],
        } as BFFMetadataGroup,
        {
          id: 'someResultTextVar',
          type: 'textVariable',
          nameInData: 'someResultTextVar',
        } as BFFMetadataTextVariable,
        {
          id: 'someRecordTypePresentationGroup',
          type: 'group',
          nameInData: 'someRecordTypeListPresentationGroup',
        } as BFFMetadataGroup,
        {
          id: 'someSearchResultPresentationGroup',
          type: 'group',
          nameInData: 'someSearchResultPresentationGroup',
        } as BFFMetadataGroup,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'someRecordTypeListPresentation',
          presentationOf: 'someRecordTypeListPresentationGroup',
        } as BFFPresentation,
        {
          id: 'someSearchResultPresentation',
          presentationOf: 'someSearchResultPresentationGroup',
        } as BFFPresentation,
      ]),
      recordTypePool: listToPool<BFFRecordType>([
        {
          id: 'someRecordType',
          metadataId: 'someRecordTypeMeta',
          listPresentationViewId: 'someRecordTypeListPresentation',
        } as BFFRecordType,
      ]),
    } as Dependencies;

    const query = { name: 'search', children: [{ name: 'foo', value: 'bar' }] };

    vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
      data: {
        dataList: {
          data: [
            {
              record: {
                data: {
                  name: 'someResultGroup',
                  children: [{ name: 'someResultTextVar', value: 'someValue' }],
                },
              },
            },
          ] as RecordWrapper[],
          fromNo: '1',
          toNo: '0',
          totalNo: '0',
          containDataOfType: 'someType',
        },
      },
    } as AxiosResponse<DataListWrapper>);

    vi.mocked(transformRecords).mockReturnValue([
      {
        recordType: 'someRecordType',
      },
    ]);

    vi.mocked(createLinkedRecordDefinition).mockReturnValue({
      form: {},
    } as FormSchema);

    const result = await searchRecords(dependencies, 'someSearch', query);

    expect(result).toEqual({
      data: [
        {
          presentation: {
            form: {},
          },
          recordType: 'someRecordType',
        },
      ],
      fromNo: 1,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'someType',
    });
  });

  it('searches and returns result with recordType list presentation', async () => {
    const dependencies = {
      searchPool: listToPool<BFFSearch>([
        {
          id: 'someSearch',
          metadataId: 'someSearchGroup',
        } as BFFSearch,
      ]),
      metadataPool: listToPool<BFFMetadata>([
        {
          id: 'someSearchGroup',
          nameInData: 'search',
          children: [{ childId: 'fooTextVar' }],
        } as BFFMetadataGroup,
        {
          id: 'fooTextVar',
          nameInData: 'foo',
        } as BFFMetadataTextVariable,
        {
          id: 'someResultGroup',
          type: 'group',
          nameInData: 'someResultGroup',
          children: [{ childId: 'someResultTextVar' }],
        } as BFFMetadataGroup,
        {
          id: 'someResultTextVar',
          type: 'textVariable',
          nameInData: 'someResultTextVar',
        } as BFFMetadataTextVariable,
        {
          id: 'someRecordTypePresentationGroup',
          type: 'group',
          nameInData: 'someRecordTypeListPresentationGroup',
        } as BFFMetadataGroup,
        {
          id: 'someRecordTypeListPresentationGroup',
          type: 'group',
          nameInData: 'someRecordTypeListPresentationGroup',
        } as BFFMetadataGroup,
      ]),
      presentationPool: listToPool<BFFPresentation>([
        {
          id: 'someRecordTypeListPresentation',
          presentationOf: 'someRecordTypeListPresentationGroup',
        } as BFFPresentation,
        {
          id: 'someSearchResultPresentation',
          presentationOf: 'someSearchResultPresentationGroup',
        } as BFFPresentation,
        {
          id: 'someRecordTypeListPresentation',
          presentationOf: 'someRecordTypeListPresentationGroup',
        } as BFFPresentation,
      ]),
      recordTypePool: listToPool<BFFRecordType>([
        {
          id: 'someRecordType',
          metadataId: 'someRecordTypeMeta',
          listPresentationViewId: 'someRecordTypeListPresentation',
        } as BFFRecordType,
      ]),
    } as Dependencies;

    const query = { name: 'search', children: [{ name: 'foo', value: 'bar' }] };

    vi.mocked(getSearchResultDataListBySearchType).mockResolvedValue({
      data: {
        dataList: {
          data: [
            {
              record: {
                data: {
                  name: 'someResultGroup',
                  children: [{ name: 'someResultTextVar', value: 'someValue' }],
                },
              },
            },
          ] as RecordWrapper[],
          fromNo: '1',
          toNo: '0',
          totalNo: '0',
          containDataOfType: 'someType',
        },
      },
    } as AxiosResponse<DataListWrapper>);

    vi.mocked(transformRecords).mockReturnValue([
      {
        recordType: 'someRecordType',
      },
    ]);

    vi.mocked(createLinkedRecordDefinition).mockReturnValue({
      form: {},
    } as FormSchema);

    const result = await searchRecords(dependencies, 'someSearch', query);

    expect(result).toEqual({
      data: [
        {
          presentation: {
            form: {},
          },
          recordType: 'someRecordType',
        },
      ],
      fromNo: 1,
      toNo: 0,
      totalNo: 0,
      containDataOfType: 'someType',
    });
  });
});
