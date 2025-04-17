import testData from '@/__mocks__/bff/coraDivaRecordTypes.json';
import testData2 from '@/__mocks__/bff/coraDivaRecordTypes2.json';
import emptyTestData from '@/__mocks__/bff/emptyDataList.json';
import { describe, expect, it } from 'vitest';
import { transformCoraRecordTypes } from '../transformRecordTypes.server';

describe('transformCoraRecordType', () => {
  it('Empty list should return empty list', () => {
    const transformData = transformCoraRecordTypes(emptyTestData);
    expect(transformData).toStrictEqual([]);
  });
  it('Returns one entry', () => {
    const transformData = transformCoraRecordTypes(testData);
    expect(transformData).toHaveLength(1);
  });
  it('Returns one entry with id', () => {
    const transformData = transformCoraRecordTypes(testData);
    const firstRecordType = transformData[0];
    expect(firstRecordType.id).toEqual('someId');
  });
  it('Returns two entries with id', () => {
    const transformData = transformCoraRecordTypes(testData2);
    const firstRecordType = transformData[0];
    expect(firstRecordType.id).toEqual('someOtherId1');
    const secondRecordType = transformData[1];
    expect(secondRecordType.id).toEqual('someOtherId2');
  });

  it('Returns one recordType with presentations group for view, list, autocomplete and menu', () => {
    const transformData = transformCoraRecordTypes(testData);
    const firstRecordType = transformData[0];
    const expected = {
      id: 'someId',
      metadataId: 'exampleDevOutputGroup',
      presentationViewId: 'exampleDevOutputOutputPGroup',
      listPresentationViewId: 'exampleDevOutputListPGroup',
      menuPresentationViewId: 'exampleDevOutputMenuPGroup',
      autocompletePresentationView: 'exampleDevOutputAutocompletePGroup',
      searchId: 'exampleSearch',
      textId: 'exampleDevOutputText',
      defTextId: 'exampleDevOutputDefText',
      groupOfRecordType: ['publicationType'],
      recordTypeCategory: ['clientNavigation'],
    };
    expect(firstRecordType).toStrictEqual(expected);
  });
});
