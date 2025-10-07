import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
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
import { transformRecord } from './transformRecord.server';

export const transformOrganisations = (
  dependencies: Dependencies,
  data: DataListWrapper,
) => {
  return data.dataList.data.map((organisation) =>
    transformRecord(dependencies, organisation),
  );
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
