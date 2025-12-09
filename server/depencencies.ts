/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';
import type {
  BFFGuiElement,
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMember,
  BFFMetadata,
  BFFOrganisation,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import { transformCoraSearch } from '@/cora/transform/transformCoraSearch.server';
import { transformLogin } from '@/cora/transform/transformLogin.server';
import { transformLoginUnit } from '@/cora/transform/transformLoginUnit.server';
import { transformMembers } from '@/cora/transform/transformMembers.server';
import { transformMetadata } from '@/cora/transform/transformMetadata.server';
import { transformOrganisations } from '@/cora/transform/transformOrganisations.server';
import { transformCoraPresentations } from '@/cora/transform/transformPresentations.server';
import { transformCoraRecordTypes } from '@/cora/transform/transformRecordTypes.server';
import { transformCoraTexts } from '@/cora/transform/transformTexts.server';
import { transformCoraValidationTypes } from '@/cora/transform/transformValidationTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { listToPool } from '@/utils/structs/listToPool';
import { Lookup } from '@/utils/structs/lookup';
import 'dotenv/config';
import { createContext } from 'react-router';

const getPoolsFromCora = (poolTypes: string[], authToken?: string) => {
  const promises = poolTypes.map((type) =>
    getRecordDataListByType<DataListWrapper>(type, authToken),
  );
  return Promise.all(promises);
};

let poolsInitialized = false;

const dependencies: Dependencies = {
  metadataPool: listToPool<BFFMetadata>([]),
  presentationPool: listToPool<BFFPresentation>([]),
  recordTypePool: listToPool<BFFRecordType>([]),
  textPool: listToPool<BFFText>([]),
  validationTypePool: listToPool<BFFValidationType>([]),
  searchPool: listToPool<BFFSearch>([]),
  loginUnitPool: listToPool<BFFLoginUnit>([]),
  loginPool: listToPool<BFFLoginWebRedirect>([]),
  memberPool: listToPool<BFFMember>([]),
  organisationPool: listToPool<BFFOrganisation>([]),
};

const loadDependencies = async () => {
  console.info('Loading Cora metadata...');

  const response = await getRecordDataListByType<DataListWrapper>('text');
  const texts = transformCoraTexts(response.data);
  dependencies.textPool = listToPool<BFFText>(texts);

  const types = [
    'metadata',
    'presentation',
    'validationType',
    'guiElement',
    'recordType',
    'search',
    'loginUnit',
    'login',
    'diva-member',
    'diva-organisation',
  ];
  const [
    coraMetadata,
    coraPresentations,
    coraValidationTypes,
    coraGuiElements,
    coraRecordTypes,
    coraSearches,
    coraLoginUnits,
    coraLogins,
    coraMembers,
    coraOrganisations,
  ] = await getPoolsFromCora(types);

  const metadata = transformMetadata(coraMetadata.data);
  dependencies.metadataPool = listToPool<BFFMetadata>(metadata);

  const presentation = transformCoraPresentations(coraPresentations.data);
  const guiElements = transformCoraPresentations(coraGuiElements.data);

  dependencies.presentationPool = listToPool<
    BFFPresentationBase | BFFPresentationGroup | BFFGuiElement
  >([...presentation, ...guiElements]);

  const validationTypes = transformCoraValidationTypes(
    coraValidationTypes.data,
  );
  const validationTypePool = listToPool<BFFValidationType>(validationTypes);
  dependencies.validationTypePool = validationTypePool;

  const recordTypes = transformCoraRecordTypes(coraRecordTypes.data);
  dependencies.recordTypePool = listToPool<BFFRecordType>(recordTypes);

  const search = transformCoraSearch(coraSearches.data);
  dependencies.searchPool = listToPool<BFFSearch>(search);

  const loginUnit = transformLoginUnit(coraLoginUnits.data);
  dependencies.loginUnitPool = listToPool<BFFLoginUnit>(loginUnit);

  const login = transformLogin(coraLogins.data);
  dependencies.loginPool = listToPool<BFFLoginWebRedirect | BFFLoginPassword>(
    login,
  );

  try {
    const members = await transformMembers(coraMembers.data);
    dependencies.memberPool = groupMembersByHostname(members);
  } catch (error) {
    console.error('Error transforming members:', error);
    dependencies.memberPool = new Lookup<string, BFFMember>();
  }

  const organisations = await transformOrganisations(coraOrganisations.data);
  dependencies.organisationPool = listToPool<BFFOrganisation>(organisations);

  console.info('Loaded stuff from Cora');
  poolsInitialized = true;
};

export const getDependencies = async () => {
  if (!poolsInitialized) {
    await loadDependencies();
  }
  return dependencies;
};

export { dependencies, loadDependencies };

const groupMembersByHostname = (
  members: BFFMember[],
): Lookup<string, BFFMember> => {
  const groupedMembers = new Lookup<string, BFFMember>();

  members.forEach((member) => {
    member.hostnames.forEach((hostname) => {
      groupedMembers.set(hostname, member);
    });
  });

  return groupedMembers;
};

export const dependenciesContext = createContext<{
  dependencies: Dependencies;
  refreshDependencies: () => Promise<void>;
}>();
