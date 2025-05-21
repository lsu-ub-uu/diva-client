import type {
  BFFMetadata,
  BFFValidationType,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataTextVariable,
} from '@/cora/transform/bffTypes.server';
import { listToPool } from '@/utils/structs/listToPool';
import {
  generateValidationTypeInterface,
  getNameFromMetadata,
} from 'typegen/generateValidationTypeInterface';
import { describe, expect, it } from 'vitest';

describe('generateValidationTypeInterface', () => {
  it('should generate an interface', () => {
    const validationTypePool = listToPool<BFFValidationType>([
      {
        id: 'validationTypeId',
        metadataGroupId: 'metadataGroupId',
      } as BFFValidationType,
    ]);

    const metadataPool = listToPool<BFFMetadata>([
      {
        id: 'metadataGroupId',
        type: 'group',
        children: [
          {
            childId: 'fooVar',
            repeatMin: '1',
            repeatMax: '1',
          },
          {
            childId: 'barGroup',
            repeatMin: '1',
            repeatMax: '1',
          },
        ],
      } as BFFMetadataGroup,
      {
        id: 'fooVar',
        nameInData: 'foo',
        type: 'textVariable',
      } as BFFMetadataTextVariable,
      {
        id: 'barGroup',
        nameInData: 'bar',
        type: 'group',
        children: [
          {
            childId: 'bazVar',
            repeatMin: '0',
            repeatMax: 'X',
          },
        ],
      } as BFFMetadataGroup,
      {
        id: 'bazVar',
        nameInData: 'baz',
        type: 'collectionVariable',
        refCollection: 'foo-bar',
      } as BFFMetadataCollectionVariable,
    ]);

    expect(
      generateValidationTypeInterface(
        validationTypePool,
        metadataPool,
        'validationTypeId',
      ).trim(),
    ).toEqual(
      `export interface ValidationTypeId 
            {  'foo':{ value: string; }; 'bar':{  'baz':{ value: string; }[] | undefined } }`.trim(),
    );
  });
});

describe('getNameFromMetadata', () => {
  it('returns the quoted nameInData if no attributeReferences', () => {
    const metadataPool = listToPool<BFFMetadata>([]);

    const metadata = {
      id: 'foo',
      nameInData: 'foo-bar',
      type: 'textVariable',
    } as BFFMetadataTextVariable;

    expect(getNameFromMetadata(metadataPool, metadata)).toEqual("'foo-bar'");
  });

  it('returns nameInData with any finalValue attributes', () => {
    const metadataPool = listToPool<BFFMetadata>([
      {
        id: 'nonFinalValue',
        nameInData: 'lang',
      } as BFFMetadataCollectionVariable,
      {
        id: 'finalValue',
        nameInData: 'type',
        finalValue: 'baz',
      } as BFFMetadataCollectionVariable,
    ]);

    const metadata = {
      id: 'foo',
      nameInData: 'foo-bar',
      type: 'textVariable',
      attributeReferences: [
        { refCollectionVarId: 'nonFinalValue' },
        { refCollectionVarId: 'finalValue' },
      ],
    } as BFFMetadataTextVariable;

    expect(getNameFromMetadata(metadataPool, metadata)).toEqual(
      "'foo-bar_type_baz'",
    );
  });
});
