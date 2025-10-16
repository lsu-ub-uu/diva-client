import type {
  BFFMetadata,
  BFFMetadataBase,
  BFFMetadataCollectionVariable,
  BFFMetadataGroup,
  BFFMetadataItemCollection,
  BFFMetadataRecordLink,
  BFFMetadataTextVariable,
  BFFRecordType,
} from '@/cora/transform/bffTypes.server';
import { listToPool } from '@/utils/structs/listToPool';
import { format } from 'prettier';
import { describe, expect, it } from 'vitest';
import {
  generateTypesForRecordTypes,
  getNameFromMetadata,
} from '../generateTypesForRecordTypes';

describe('generateTypesForRecordTypes', () => {
  it('should generate an interface', async () => {
    const recordTypePool = listToPool<BFFRecordType>([
      {
        id: 'recordTypeId',
        metadataId: 'metadataGroupId',
      } as BFFRecordType,
      {
        id: 'anotherRecordTypeId',
        metadataId: 'anotherMetadataGroupId',
      } as BFFRecordType,
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
          { childId: 'aRecordLink', repeatMin: '1', repeatMax: '1' },
        ],
      } as BFFMetadataGroup,
      {
        id: 'aRecordLink',
        nameInData: 'anotherRecord',
        linkedRecordType: 'anotherRecordTypeId',
        type: 'recordLink',
      } as BFFMetadataRecordLink,
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
      {
        id: 'anotherMetadataGroupId',
        type: 'group',
        nameInData: 'anotherRoot',
        children: [
          {
            childId: 'fooVar',
            repeatMin: '0',
            repeatMax: '1',
          },
        ],
      } as BFFMetadataGroup,
    ]);

    const actual = generateTypesForRecordTypes(recordTypePool, metadataPool, [
      'recordTypeId',
    ]);

    const expected = `
      export interface RecordTypeId extends BFFDataRecordData {
        root: MetadataGroupId;
      }
      
      export type LangCollection = "en" | "sv";
      
      export interface BarGroup {
        baz?: { value: string; __text: { sv: string; en: string } }[];
        _type: "code";
        __text: { sv: string; en: string };
      }

       export interface AnotherRecordTypeId extends BFFDataRecordData {
         anotherRoot: AnotherMetadataGroupId;
       }
      
       export interface AnotherMetadataGroupId {
         foo?: {
           value: string;
           _lang: LangCollection;
           __text: { sv: string; en: string };
         };
         __text: { sv: string; en: string };
       }
      
       export interface MetadataGroupId {
         foo?: {
           value: string;
           _lang: LangCollection;
           __text: { sv: string; en: string };
         };
         bar_type_code: BarGroup;
         anotherRecord: {
           value: string;
           linkedRecord: {
             anotherRoot: AnotherMetadataGroupId;
           };
           
           __text: { sv: string; en: string };
         };
         __text: { sv: string; en: string };
        }
    `;

    expect(await format(actual, { parser: 'typescript' })).toEqual(
      await format(expected, { parser: 'typescript' }),
    );
  });

  it('should handle displayName for linked organisations', async () => {
    const recordTypePool = listToPool<BFFRecordType>([
      {
        id: 'recordTypeId',
        metadataId: 'metadataGroupId',
      } as BFFRecordType,
      {
        id: 'diva-organisation',
        metadataId: 'organisationGroup',
      } as BFFRecordType,
    ]);

    const metadataPool = listToPool<BFFMetadata>([
      {
        id: 'metadataGroupId',
        type: 'group',
        nameInData: 'root',
        children: [
          {
            childId: 'organisationRecordLink',
            repeatMin: '1',
            repeatMax: '1',
          },
        ],
      } as BFFMetadataGroup,
      {
        id: 'organisationRecordLink',
        nameInData: 'organisation',
        linkedRecordType: 'diva-organisation',
        type: 'recordLink',
      } as BFFMetadataRecordLink,
      {
        id: 'organisationGroup',
        type: 'group',
        nameInData: 'organisation',
        children: [
          {
            childId: 'nameVar',
            repeatMin: '1',
            repeatMax: '1',
          },
        ],
      } as BFFMetadataGroup,
      {
        id: 'nameVar',
        nameInData: 'name',
        type: 'textVariable',
      } as BFFMetadataTextVariable,
    ]);

    const actual = generateTypesForRecordTypes(recordTypePool, metadataPool, [
      'recordTypeId',
    ]);

    const expected = `
      export interface RecordTypeId extends BFFDataRecordData {
        root: MetadataGroupId;
      }

      export interface DivaOrganisation extends BFFDataRecordData {
        organisation: OrganisationGroup;
      }

      export interface OrganisationGroup {
        name: { value: string; __text: { sv: string; en: string } };
        __text: { sv: string; en: string };
      }

      export interface MetadataGroupId {
        organisation: {
          value: string;
          linkedRecord: {
            organisation: OrganisationGroup;
          };
          displayName?: { sv: string; en: string };
          __text: { sv: string; en: string };
        };
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

  it('returns nameInData with two finalValue attributes', () => {
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
      {
        id: 'otherFinalValue',
        nameInData: 'otherType',
        finalValue: 'foo',
      } as BFFMetadataCollectionVariable,
    ]);

    const metadata = {
      id: 'foo',
      nameInData: 'foo-bar',
      type: 'textVariable',
      attributeReferences: [
        { refCollectionVarId: 'nonFinalValue' },
        { refCollectionVarId: 'finalValue' },
        { refCollectionVarId: 'otherFinalValue' },
      ],
    } as BFFMetadataTextVariable;

    expect(getNameFromMetadata(metadataPool, metadata)).toEqual(
      "'foo-bar_otherType_foo_type_baz'",
    );
  });
});
