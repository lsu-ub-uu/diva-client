import {
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData,
  getFirstDataGroupWithNameInDataAndAttributes,
  hasChildWithNameInDataAndAttributes,
} from '../cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '../cora-data/CoraDataUtilsWrappers.server';
import type {
  DataGroup,
  DataListWrapper,
  RecordWrapper,
} from '../cora-data/types.server';
import type { BFFOrganisation } from './bffTypes.server';

export const transformOrganisations = (
  data: DataListWrapper,
): BFFOrganisation[] => {
  return data.dataList.data.map(transformOrganisation);
};

const transformOrganisation = (data: RecordWrapper): BFFOrganisation => {
  const organisationDataGroup = data.record.data;
  return {
    id: getId(organisationDataGroup),
    parentOrganisationId: getParentOrganisationId(organisationDataGroup),
    name: getName(organisationDataGroup),
    rorId: getRorId(organisationDataGroup),
  };
};

const getId = (organisationDataGroup: DataGroup): string => {
  const recordInfo = getFirstDataGroupWithNameInData(
    organisationDataGroup,
    'recordInfo',
  );
  return getFirstDataAtomicValueWithNameInData(recordInfo, 'id');
};

const getParentOrganisationId = (
  organisationDataGroup: DataGroup,
): string | undefined => {
  if (
    !hasChildWithNameInDataAndAttributes(organisationDataGroup, 'related', {
      type: 'parent',
    })
  ) {
    return undefined;
  }

  const parentOrganisation = getFirstDataGroupWithNameInDataAndAttributes(
    organisationDataGroup,
    'related',
    { type: 'parent' },
  );
  const parentOrganisationLink = getFirstDataGroupWithNameInData(
    parentOrganisation as DataGroup,
    'organisation',
  );
  return getFirstDataAtomicValueWithNameInData(
    parentOrganisationLink,
    'linkedRecordId',
  );
};

const getName = (organisationDataGroup: DataGroup) => {
  const swedishName = getSwedishName(organisationDataGroup);
  const englishName = getEnglishName(organisationDataGroup);
  return {
    sv: swedishName,
    en: englishName ?? swedishName,
  };
};

const getSwedishName = (organisationDataGroup: DataGroup) => {
  const authorityLangSwe = getFirstDataGroupWithNameInDataAndAttributes(
    organisationDataGroup,
    'authority',
    { lang: 'swe' },
  );
  return getNamePart(authorityLangSwe);
};

const getEnglishName = (organisationDataGroup: DataGroup) => {
  const hasEnglishName = hasChildWithNameInDataAndAttributes(
    organisationDataGroup,
    'variant',
    {
      lang: 'eng',
    },
  );
  if (!hasEnglishName) {
    return undefined;
  }
  const variantLangEng = getFirstDataGroupWithNameInDataAndAttributes(
    organisationDataGroup,
    'variant',
    { lang: 'eng' },
  );
  return getNamePart(variantLangEng);
};

const getNamePart = (authorityOrVariant: DataGroup) => {
  const name = getFirstDataGroupWithNameInData(authorityOrVariant, 'name');
  return getFirstDataAtomicValueWithNameInData(name, 'namePart');
};

function getRorId(organisationDataGroup: DataGroup): string | undefined {
  if (
    !hasChildWithNameInDataAndAttributes(organisationDataGroup, 'identifier', {
      type: 'ror',
    })
  ) {
    return undefined;
  }

  return getFirstDataAtomicWithNameInData(organisationDataGroup, 'identifier', {
    type: 'ror',
  }).value;
}
