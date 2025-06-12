import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataTextVariable,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import { listToPool } from '@/utils/structs/listToPool';
import { format } from 'prettier';
import {
  generateTypesForRecordTypes,
  getNameFromMetadata,
} from '../generateTypesForRecordTypes';
import { describe, expect, it } from 'vitest';

describe('generateValidationTypeInterface', () => {
  it('should generate an interface', async () => {
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
        nameInData: 'root',
        children: [
          {
            childId: 'fooVar',
            repeatMin: '0',
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
        attributeReferences: [{ refCollectionVarId: 'langVar' }],
      } as BFFMetadataTextVariable,
      {
        id: 'barGroup',
        nameInData: 'bar',
        type: 'group',
        attributeReferences: [{ refCollectionVarId: 'typeVar' }],
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
        type: 'textVariable',
      } as BFFMetadataTextVariable,
      {
        id: 'typeVar',
        nameInData: 'type',
        type: 'collectionVariable',
        finalValue: 'code',
      } as BFFMetadataCollectionVariable,
      {
        id: 'langVar',
        nameInData: 'lang',
        type: 'collectionVariable',
        refCollection: 'langCollection',
      } as BFFMetadataCollectionVariable,
      {
        id: 'langCollection',
        type: 'itemCollection',
        collectionItemReferences: [
          { refCollectionItemId: 'enItem' },
          { refCollectionItemId: 'svItem' },
        ],
      } as BFFMetadataItemCollection,
      {
        id: 'enItem',
        nameInData: 'en',
        type: 'collectionItem',
      } as BFFMetadataBase,
      {
        id: 'svItem',
        nameInData: 'sv',
        type: 'collectionItem',
      } as BFFMetadataBase,
    ]);

    const actual = generateTypesForRecordTypes(
      validationTypePool,
      metadataPool,
      ['validationTypeId'],
    );

    const expected = `
      export interface ValidationTypeId extends BFFDataRecordData {
        root: MetadataGroupId;
      }
      
      export type LangCollection = "en" | "sv";
      
      export interface BarGroup {
        baz?: { value: string; __text: { sv: string; en: string } }[];
        _type: "code";
        __text: { sv: string; en: string };
      }
      
      export interface MetadataGroupId {
        foo?: {
          value: string;
          _lang: LangCollection;
          __text: { sv: string; en: string };
        };
        bar_type_code: BarGroup;
        __text: { sv: string; en: string };
      }
    `;

    expect(await format(actual, { parser: 'typescript' })).toEqual(
      await format(expected, { parser: 'typescript' }),
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
