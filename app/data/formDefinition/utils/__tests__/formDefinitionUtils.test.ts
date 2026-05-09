import { describe, expect, it } from 'vitest';
import { createCollVar, createCollVarFinal } from '../../__tests__/utils';
import type {
  BFFAttributeReference,
  BFFMetadata,
  BFFPresentationRecordLink,
} from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import {
  getAttributesByAttributeReferences,
  hasLinkedPresentation,
} from '../formDefinitionUtils.server';

describe('formDefinitionUtils', () => {
  describe('getAttributesForAttributeReferences', () => {
    it('should return an object with nameInData and item values', () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'attributeName',
        ['blue', 'pink', 'yellow'],
        [],
      );

      const attributeReferences: BFFAttributeReference[] = [
        { refCollectionVarId: 'mmAttribute' },
      ];

      const mockMetadataPool = listToPool<BFFMetadata>([...mmAttribute]);
      const actual = getAttributesByAttributeReferences(
        mockMetadataPool,
        attributeReferences,
      );

      const expected = {
        ['attributeName']: ['blue', 'pink', 'yellow'],
      };
      expect(actual).toStrictEqual(expected);
    });

    it('should return an object with nameInData and item values for finalValue', () => {
      const mockDependencies = {
        metadataPool: listToPool([
          createCollVarFinal('mmAttribute', 'attributeName', 'blue', []),
        ]),
      };
      const attributeReferences: BFFAttributeReference[] = [
        { refCollectionVarId: 'mmAttribute' },
      ];

      const actual = getAttributesByAttributeReferences(
        mockDependencies.metadataPool,
        attributeReferences,
      );

      const expected = { ['attributeName']: ['blue'] };
      expect(actual).toStrictEqual(expected);
    });

    it('should return an object with nameInData and item values for multiple attributes', () => {
      const mmAttribute = createCollVar(
        'mmAttribute',
        'mmAttributeName',
        ['blue', 'pink', 'yellow'],
        [],
      );
      const pmAttribute = createCollVar(
        'pmAttribute',
        'pmAttributeName',
        ['green', 'red', 'black'],
        [],
      );
      const attributeReferences: BFFAttributeReference[] = [
        { refCollectionVarId: 'mmAttribute' },
        { refCollectionVarId: 'pmAttribute' },
      ];

      const mockMetadataPool = listToPool<BFFMetadata>([
        ...mmAttribute,
        ...pmAttribute,
      ]);

      const actual = getAttributesByAttributeReferences(
        mockMetadataPool,
        attributeReferences,
      );

      const expected = {
        ['mmAttributeName']: ['blue', 'pink', 'yellow'],
        ['pmAttributeName']: ['green', 'red', 'black'],
      };
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('hasLinkedPresentation', () => {
    it('return true for link presentation with presentation', () => {
      const presentation = {
        id: 'nationalSubjectCategoryPLink',
        type: 'pRecordLink',
        presentationOf: 'nationalSubjectCategoryLink',
        mode: 'output',
        linkedRecordPresentations: [
          {
            presentedRecordType: 'nationalSubjectCategory',
            presentationId: 'nationalSubjectCategoryWhenLinkedOutputPGroup',
          },
        ],
      };
      const actual = hasLinkedPresentation(
        presentation as BFFPresentationRecordLink,
      );
      expect(actual).toBeTruthy();
    });
    it('return false for link presentation with presentation', () => {
      const presentation = {
        id: 'nationalSubjectCategoryPLink',
        type: 'pRecordLink',
        presentationOf: 'nationalSubjectCategoryLink',
        mode: 'output',
      };
      const actual = hasLinkedPresentation(
        presentation as BFFPresentationRecordLink,
      );
      expect(actual).toBeFalsy();
    });
  });
});
