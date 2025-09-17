import { describe, expect, it } from 'vitest';
import { transformOrganisations } from '../transformOrganisations.server';
import coraOrganisationListWithOneOrganisation from '@/__mocks__/bff/coraOrganisationListWithOneOrganisation.json';
import coraOrganisationListWithTopOrganisation from '@/__mocks__/bff/coraOrganisationListWithTopOrganisation.json';
import coraOrganisationListWithOneOrganisationAndEnglishName from '@/__mocks__/bff/coraOrganisationListWithOneOrganisationAndEnglishName.json';
import coraOrganisationList from '@/__mocks__/bff/coraOrganisationList.json';
import type { DataListWrapper } from '@/cora/cora-data/types.server';

describe('transformOrganisations', () => {
  it('Empty list should return empty', () => {
    const metadataList = transformOrganisations({
      dataList: {
        fromNo: '0',
        data: [],
        totalNo: '1',
        containDataOfType: 'recordType',
        toNo: '1',
      },
    });
    expect(metadataList).toStrictEqual([]);
  });

  it('Retuns an organisation per entry in the list', () => {
    const organisationList = transformOrganisations(
      coraOrganisationList as DataListWrapper,
    );
    expect(organisationList).toHaveLength(5);
  });

  it('Returns one organisation entry', () => {
    const organisationList = transformOrganisations(
      coraOrganisationListWithOneOrganisation as DataListWrapper,
    );
    expect(organisationList).toHaveLength(1);
  });

  it('Returns one organisation entry for a organistation', () => {
    const organisations = transformOrganisations(
      coraOrganisationListWithOneOrganisation as DataListWrapper,
    );
    const firstOrganisation = organisations[0];
    expect(firstOrganisation.id).toEqual('diva-organisation:19263605242540875');
    expect(firstOrganisation.parentOrganisationId).toEqual(
      'diva-organisation:1530219071900116',
    );
    expect(firstOrganisation.name.sv).toEqual('Level 1 swe org');
    expect(firstOrganisation.name.en).toBeUndefined();
    expect(firstOrganisation.rorId).toEqual('048a87296');
  });

  it('Returns one organisation entry with english name', () => {
    const organisations = transformOrganisations(
      coraOrganisationListWithOneOrganisationAndEnglishName as DataListWrapper,
    );
    const firstOrganisation = organisations[0];
    expect(firstOrganisation.name.en).toEqual('Level 1 eng org');
  });

  it('Returns an organisation without parent organisation', () => {
    const organisations = transformOrganisations(
      coraOrganisationListWithTopOrganisation as DataListWrapper,
    );
    const firstOrganisation = organisations[0];
    expect(firstOrganisation.parentOrganisationId).toBeUndefined();
  });
});
