import {
  someMetadataCollectionVariable,
  someNewMetadataGroupForMissingChildId,
} from '@/__mocks__/bff/form/bffMock';
import type { BFFMetadata } from '@/cora/bffTypes.server';
import { listToPool } from 'server/dependencies/util/listToPool';
import { Lookup } from 'server/dependencies/util/lookup';
import { describe, expect, it } from 'vitest';
import {
  createBasicDependencies,
  createChildReferences,
  createCollVar,
  createCollVarFinal,
  createTextVar,
} from '../../__tests__/utils';
import {
  findMetadataChildReferenceByNameInDataAndAttributes,
  firstAttributesExistsInSecond,
} from '../findMetadataChildReferenceByNameInDataAndAttributes.server';

describe('findMetadataChildReferenceByNameInDataAndAttributes', () => {
  it('findMetadataChildReferenceByNameInDataAndAttributes with correct nameInData', () => {
    const test = findMetadataChildReferenceByNameInDataAndAttributes(
      createBasicDependencies().metadataPool,
      someNewMetadataGroupForMissingChildId.children,
      someMetadataCollectionVariable,
    );

    expect(test).toStrictEqual([
      {
        childId: 'exampleCollectionVarId',
        repeatMax: '1',
        repeatMin: '0',
      },
    ]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes equal nameInData`, () => {
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', []);
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', []);
    const childRefs = createChildReferences(['mmTextVar']);

    const mockMetadataPool: Lookup<string, BFFMetadata> = listToPool([
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefs,
      pmTextVar,
    );

    expect(actual).toStrictEqual(childRefs);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes unequal nameInData`, () => {
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', []);
    const pmTextVar = createTextVar('pmTextVar', 'someNameInDataNOT', []);
    const childRefs = createChildReferences([mmTextVar.id]);

    const mockMetadataPool: Lookup<string, BFFMetadata> = listToPool([
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefs,
      pmTextVar,
    );

    expect(actual).toStrictEqual([]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData and unequal number of attributes`, () => {
    const mmAttribute = createCollVar(
      'mmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const mmAttribute1 = createCollVar(
      'mmAttribute1',
      'attributeName11',
      ['value1', 'value2'],
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
      'mmAttribute1',
    ]);
    const pmAttribute = createCollVar(
      'pmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'pmAttribute',
    ]);

    const mockMetadataPool: Lookup<string, BFFMetadata> = listToPool([
      mmTextVar,
      pmTextVar,
      ...mmAttribute,
      ...mmAttribute1,
      ...pmAttribute,
    ]);

    const childRefs = createChildReferences([mmTextVar.id]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefs,
      pmTextVar,
    );

    expect(actual).toStrictEqual([]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and same attributes`, () => {
    const mmAttribute = createCollVar(
      'mmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const childRefs = createChildReferences([mmTextVar.id]);

    const metadataPool = listToPool<BFFMetadata>([
      ...mmAttribute,
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      metadataPool,
      childRefs,
      pmTextVar,
    );

    expect(actual).toStrictEqual(childRefs);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and equal attributes`, () => {
    const mmAttribute = createCollVar(
      'mmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const pmAttribute = createCollVar(
      'pmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'pmAttribute',
    ]);
    const children = createChildReferences([mmTextVar.id]);

    const mockMetadataPool: Lookup<string, BFFMetadata> = listToPool([
      ...mmAttribute,
      ...pmAttribute,
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      children,
      pmTextVar,
    );

    expect(actual).toStrictEqual(children);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes and equal attributes multiple children to find in`, () => {
    const mmAttribute = createCollVar(
      'mmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const pmAttribute = createCollVar(
      'pmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'pmAttribute',
    ]);
    const textVar3 = createTextVar('textVar3', 'someNameInData3', [
      'pmAttribute',
    ]);
    const childRefs = createChildReferences([mmTextVar.id, textVar3.id]);

    const mockMetadataPool = listToPool<BFFMetadata>([
      ...mmAttribute,
      ...pmAttribute,
      mmTextVar,
      pmTextVar,
      textVar3,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefs,
      pmTextVar,
    );

    expect(actual).toStrictEqual([childRefs[0]]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
        and same number of attributes but different nameInData of attribute`, () => {
    const mmAttribute = createCollVar(
      'mmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const pmAttribute = createCollVar(
      'pmAttribute',
      'attributeNameNOT',
      ['value1', 'value2'],
      [],
    );
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'pmAttribute',
    ]);
    const childRefs = createChildReferences([mmTextVar.id]);

    const mockMetadataPool = listToPool<BFFMetadata>([
      ...mmAttribute,
      ...pmAttribute,
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefs,
      pmTextVar,
    );

    expect(actual).toStrictEqual([]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different value of attribute`, () => {
    const mmAttribute = createCollVar(
      'mmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const pmAttribute = createCollVar(
      'pmAttribute',
      'attributeName',
      ['valueNOT1', 'value2'],
      [],
    );
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'pmAttribute',
    ]);
    const childRefs = createChildReferences([mmTextVar.id]);

    const mockMetadataPool = listToPool<BFFMetadata>([
      ...mmAttribute,
      ...pmAttribute,
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefs,
      pmTextVar,
    );
    expect(actual).toStrictEqual([]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different wider value of attribute in presentation`, () => {
    const onlyValueTwoAttribute = createCollVar(
      'onlyValueTwoCollVar',
      'attributeName',
      ['value2'],
      [],
    );
    const onlyValueTwoTextVar = createTextVar(
      'onlyValueTwoTextVar',
      'someNameInData',
      ['onlyValueTwoCollVar'],
    );
    const valueOneOrTwoAttribute = createCollVar(
      'valueOneOrTwoCollVar',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const valueOneOrTwoTextVar = createTextVar(
      'valueOneOrTwoTextVar',
      'someNameInData',
      ['valueOneOrTwoCollVar'],
    );
    const childRefsForCurrentGroup = createChildReferences([
      onlyValueTwoTextVar.id,
    ]);

    const mockMetadataPool = listToPool<BFFMetadata>([
      ...onlyValueTwoAttribute,
      ...valueOneOrTwoAttribute,
      onlyValueTwoTextVar,
      valueOneOrTwoTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefsForCurrentGroup,
      valueOneOrTwoTextVar,
    );
    expect(actual).toStrictEqual([childRefsForCurrentGroup[0]]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but different more specific value of attribute in 
      presentation`, () => {
    const mmAttribute = createCollVar(
      'mmAttribute',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const pmAttribute = createCollVar(
      'pmAttribute',
      'attributeName',
      ['value2'],
      [],
    );
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'pmAttribute',
    ]);
    const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

    const mockMetadataPool = listToPool<BFFMetadata>([
      ...mmAttribute,
      ...pmAttribute,
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefsForCurrentGroup,
      pmTextVar,
    );
    expect(actual).toStrictEqual([]);
  });

  // FINAL VALUE FOR ATTRIBUTES
  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in metadata`, () => {
    const mmAttribute = createCollVarFinal(
      'mmAttribute',
      'attributeName',
      'value1',
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const pmAttribute = createCollVar(
      'pmAttribute',
      'attributeName',
      ['value1'],
      [],
    );
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'pmAttribute',
    ]);
    const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

    const mockMetadataPool = listToPool<BFFMetadata>([
      mmAttribute,
      ...pmAttribute,
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefsForCurrentGroup,
      pmTextVar,
    );
    expect(actual).toStrictEqual([childRefsForCurrentGroup[0]]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in presentation`, () => {
    const mmAttribute = createCollVar(
      'mmAttribute',
      'attributeName',
      ['value1'],
      [],
    );
    const mmTextVar = createTextVar('mmTextVar', 'someNameInData', [
      'mmAttribute',
    ]);
    const pmAttribute = createCollVarFinal(
      'pmAttribute',
      'attributeName',
      'value1',
      [],
    );
    const pmTextVar = createTextVar('pmTextVar', 'someNameInData', [
      'pmAttribute',
    ]);
    const childRefsForCurrentGroup = createChildReferences([mmTextVar.id]);

    const mockMetadataPool = listToPool<BFFMetadata>([
      ...mmAttribute,
      pmAttribute,
      mmTextVar,
      pmTextVar,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefsForCurrentGroup,
      pmTextVar,
    );
    expect(actual).toStrictEqual([childRefsForCurrentGroup[0]]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in metadata`, () => {
    const finalValueAttribute = createCollVarFinal(
      'finalValueCollVar',
      'attributeName',
      'value1',
      [],
    );
    const valueOneOrValueTwoAttribute = createCollVar(
      'valueOneOrValueTwoCollVar',
      'attributeName',
      ['value1', 'value2'],
      [],
    );

    const metadataTextVarFromCurrentGroup = createTextVar(
      'metadataTextVarFromCurrentGroup',
      'someNameInData',
      ['finalValueCollVar'],
    );
    const metadataFromPresentation = createTextVar(
      'metadataFromPresentation',
      'someNameInData',
      ['valueOneOrValueTwoCollVar'],
    );
    const childRefsForCurrentGroup = createChildReferences([
      metadataTextVarFromCurrentGroup.id,
    ]);
    const mockMetadataPool = listToPool<BFFMetadata>([
      finalValueAttribute,
      ...valueOneOrValueTwoAttribute,
      metadataTextVarFromCurrentGroup,
      metadataFromPresentation,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefsForCurrentGroup,
      metadataFromPresentation,
    );
    expect(actual).toStrictEqual([childRefsForCurrentGroup[0]]);
  });

  it(`findMetadataChildReferenceByNameInDataAndAttributes same nameInData 
      and same number of attributes but finalValue of attribute in presentation
      is more specific`, () => {
    const valueOneOrTwoCollVar = createCollVar(
      'valueOneOrTwoCollVar',
      'attributeName',
      ['value1', 'value2'],
      [],
    );
    const collVarWithFinalValue = createCollVarFinal(
      'collVarWithFinalValue',
      'attributeName',
      'value2',
      [],
    );
    const metadataFromCurrentGroup = createTextVar(
      'metadataFromCurrentGroup',
      'someNameInData',
      ['valueOneOrTwoCollVar'],
    );
    const metadataFromPresentation = createTextVar(
      'metadataFromPresentation',
      'someNameInData',
      ['collVarWithFinalValue'],
    );
    const childRefsForCurrentGroup = createChildReferences([
      metadataFromCurrentGroup.id,
    ]);

    const mockMetadataPool = listToPool<BFFMetadata>([
      ...valueOneOrTwoCollVar,
      collVarWithFinalValue,
      metadataFromCurrentGroup,
      metadataFromPresentation,
    ]);

    const actual = findMetadataChildReferenceByNameInDataAndAttributes(
      mockMetadataPool,
      childRefsForCurrentGroup,
      metadataFromPresentation,
    );
    expect(actual).toStrictEqual([]);
  });

  describe('firstAttributesExistsInSecond', () => {
    it('testSameAttributeUndefined', () => {
      const actual = firstAttributesExistsInSecond(undefined, undefined);
      expect(actual).toBe(true);
    });

    it('testSameAttributeOneUndefined', () => {
      const actual = firstAttributesExistsInSecond({}, undefined);
      expect(actual).toBe(true);
      const actual2 = firstAttributesExistsInSecond(undefined, {});
      expect(actual2).toBe(true);
    });

    it('testSameAttributeEmpty', () => {
      const actual = firstAttributesExistsInSecond({}, {});
      expect(actual).toBe(true);
    });

    it('testSameAttributeOneEmpty', () => {
      const mmAttribute = {
        anAttribute: ['aFinalValue'],
      };
      const pmAttribute = {};
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(false);
    });

    it('testfirstAttributesExistsInSecond', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(true);
    });

    it('testfirstAttributesExistsInSecondReversedAttributes', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(true);
    });

    it('testSameAttributeDifferentAttributeValues', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(false);
    });

    it('testSameAttributeDifferentAttributeValues2', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aOtherFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(false);
    });

    it('testSameAttributeDifferentAttributeValues3', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(true);
    });

    it('testSameAttributeDifferentAttributeValues4', () => {
      const mmAttribute = {
        someNameInData: ['aOtherFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(true);
    });

    it('testSameAttributeDifferentAttributeValues5', () => {
      const mmAttribute = {
        someNameInData: ['aOtherFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aOtherFinalValue', 'aFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(true);
    });

    it('testSameAttributeDifferentAttributeValues6', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aOtherFinalValue', 'aFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(true);
    });

    it('testSameAttributeDifferent', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue', 'aOtherFinalValue'],
      };
      const pmAttribute = {
        someNameInDataNOT: ['aFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(false);
    });

    it('testSameAttributeDifferentName', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue'],
      };
      const pmAttribute = {
        someNameInDataNOT: ['aFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(false);
    });

    it('testMultipleAttributesDifferentName', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue'],
        someOtherNameInData: ['aFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aFinalValue'],
        someOtherNameInData: ['aFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(true);
    });

    it('testMultipleAttributesDifferentName2', () => {
      const mmAttribute = {
        someNameInData: ['aFinalValue'],
        someOtherNameInData: ['aOtherFinalValue'],
      };
      const pmAttribute = {
        someNameInData: ['aFinalValue'],
        someOtherNameInData: ['aFinalValue'],
      };
      const actual = firstAttributesExistsInSecond(mmAttribute, pmAttribute);
      expect(actual).toBe(false);
    });
  });
});
