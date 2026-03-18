import type { BFFValidationType, Dependencies } from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import { describe, expect, it, vi } from 'vitest';
import { getValidationTypes } from '../getValidationTypes.server';

vi.mock('@/cora/getSearchResultDataListBySearchType.server');

describe('getValidationTypes', () => {
  it('should return an empty list of validationTypes', async () => {
    const dependencies = {
      validationTypePool: listToPool<BFFValidationType>([
        { validatesRecordTypeId: 'someOtherRecordType' } as BFFValidationType,
      ]),
    } as Dependencies;
    const response = await getValidationTypes('someRecordType', dependencies);
    expect(response).toEqual([]);
  });

  it('should return a list of validationTypes', async () => {
    const dependencies = {
      validationTypePool: listToPool<BFFValidationType>([
        {
          id: 'someValidationTypeId',
          nameTextId: 'someValidationTypeName',
          validatesRecordTypeId: 'someRecordType',
        } as BFFValidationType,
        {
          id: 'someOtherValidationTypeId',
          nameTextId: 'someOtherValidationTypeName',
          validatesRecordTypeId: 'someOtherRecordType',
        } as BFFValidationType,
        {
          id: 'someValidationType2Id',
          nameTextId: 'someValidationType2Name',
          validatesRecordTypeId: 'someRecordType',
        } as BFFValidationType,
      ]),
    } as Dependencies;
    const response = await getValidationTypes('someRecordType', dependencies);
    expect(response).toEqual([
      {
        label: 'someValidationTypeName',
        value: 'someValidationTypeId',
      },
      {
        label: 'someValidationType2Name',
        value: 'someValidationType2Id',
      },
    ]);
  });

  it('should remove classic validationTypes', async () => {
    const dependencies = {
      validationTypePool: listToPool<BFFValidationType>([
        {
          id: 'someValidationTypeId',
          nameTextId: 'someValidationTypeName',
          validatesRecordTypeId: 'someRecordType',
        } as BFFValidationType,
        {
          id: 'classic_someOtherValidationTypeId',
          nameTextId: 'someOtherValidationTypeName',
          validatesRecordTypeId: 'someOtherRecordType',
        } as BFFValidationType,
      ]),
    } as Dependencies;
    const response = await getValidationTypes('someRecordType', dependencies);
    expect(response).toEqual([
      {
        label: 'someValidationTypeName',
        value: 'someValidationTypeId',
      },
    ]);
  });
});
