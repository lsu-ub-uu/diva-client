import emptyTestData from '@/__mocks__/bff/emptyDataList.json';
import validationTypeList from '@/__mocks__/bff/validationTypeList.json';
import validationTypeListWithTwo from '@/__mocks__/bff/validationTypeListWithTwo.json';
import coraValidationTypeDataListSearch from '@/__mocks__/bff/coraValidationTypeDataListSearch.json';
import { transformCoraValidationTypes } from '../transformValidationTypes.server';

describe('transformCoraValidationType', () => {
  it('Empty list should return empty list', () => {
    const transformData = transformCoraValidationTypes(emptyTestData);
    expect(transformData).toStrictEqual([]);
  });
  it('Returns one entry', () => {
    const transformData = transformCoraValidationTypes(validationTypeList);
    expect(transformData).toHaveLength(1);
  });
  it('Returns one entry with id', () => {
    const transformData = transformCoraValidationTypes(validationTypeList);
    const firstRecordType = transformData[0];
    expect(firstRecordType.id).toEqual('someValidationTypeId');
  });
  it('Returns two entries with id', () => {
    const transformData = transformCoraValidationTypes(
      validationTypeListWithTwo,
    );
    const firstRecordType = transformData[0];
    expect(firstRecordType.id).toEqual('someValidationTypeId1');
    const secondRecordType = transformData[1];
    expect(secondRecordType.id).toEqual('someValidationTypeId2');
  });
  it('Returns one BFFValidationType for one validationType', () => {
    const transformData = transformCoraValidationTypes(validationTypeList);
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toEqual({
      id: 'someValidationTypeId',
      validatesRecordTypeId: 'someRecordTypeToValidate',
      newMetadataGroupId: 'someNewGroup',
      metadataGroupId: 'someGroup',
      newPresentationGroupId: 'someNewPGroup',
      presentationGroupId: 'somePGroup',
      nameTextId: 'someText',
      defTextId: 'someDefText',
    });
  });
  it('Returns two BFFValidationTypes for two validationTypes', () => {
    const transformData = transformCoraValidationTypes(
      validationTypeListWithTwo,
    );
    expect(transformData).toHaveLength(2);
    expect(transformData[0]).toEqual({
      id: 'someValidationTypeId1',
      validatesRecordTypeId: 'someRecordTypeToValidate',
      newMetadataGroupId: 'someNewGroup',
      metadataGroupId: 'someGroup',
      newPresentationGroupId: 'someNewPGroup',
      presentationGroupId: 'somePGroup',
      nameTextId: 'someText',
      defTextId: 'someDefText',
    });
    expect(transformData[1]).toEqual({
      id: 'someValidationTypeId2',
      validatesRecordTypeId: 'someRecordTypeToValidate2',
      newMetadataGroupId: 'someNewGroup2',
      metadataGroupId: 'someGroup2',
      newPresentationGroupId: 'someNewPGroup2',
      presentationGroupId: 'somePGroup2',
      nameTextId: 'someText2',
      defTextId: 'someDefText2',
    });
  });

  it('Returns BFFValidationTypes for a validationType datalist search', () => {
    const transformData = transformCoraValidationTypes(
      coraValidationTypeDataListSearch,
    );
    expect(transformData).toHaveLength(1);
    expect(transformData[0]).toEqual({
      defTextId: 'manuscriptValidationDefText',
      id: 'manuscript',
      metadataGroupId: 'manuscriptUpdateGroup',
      nameTextId: 'manuscriptText',
      newMetadataGroupId: 'manuscript2NewGroup',
      newPresentationGroupId: 'manuscript2NewPGroup',
      presentationGroupId: 'manuscriptUpdatePGroup',
      validatesRecordTypeId: 'divaOutput',
    });
  });
});
