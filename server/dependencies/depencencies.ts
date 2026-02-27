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
  Dependencies,
  DeploymentInfo,
} from '@/cora/bffTypes.server';
import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
import { getDeploymentInfo } from '@/cora/getDeploymentInfo.server';
import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';
import {
  transformCoraSearch,
  transformCoraSearchToBFFSearch,
} from '@/cora/transform/transformCoraSearch.server';
import {
  transformCoraLoginToBFFLogin,
  transformLogins,
} from '@/cora/transform/transformLogin.server';
import {
  transformCoraLoginUnitToBFFLoginUnit,
  transformLoginUnits,
} from '@/cora/transform/transformLoginUnit.server';
import {
  transformMember,
  transformMembers,
} from '@/cora/transform/transformMembers.server';
import {
  transformMetadata,
  transformMetadatas,
} from '@/cora/transform/transformMetadata.server';
import {
  transformOrganisation,
  transformOrganisations,
} from '@/cora/transform/transformOrganisations.server';
import {
  transformCoraPresentations,
  transformCoraPresentationToBFFPresentation,
} from '@/cora/transform/transformPresentations.server';
import {
  transformCoraRecordTypes,
  transformRecordType,
} from '@/cora/transform/transformRecordTypes.server';
import {
  transformCoraTexts,
  transformCoraTextToBFFText,
} from '@/cora/transform/transformTexts.server';
import {
  transformCoraValidationTypes,
  transformValidationType,
} from '@/cora/transform/transformValidationTypes.server';

import { getRecordDataById } from '@/cora/getRecordDataById.server';
import 'dotenv/config';
import type { DataChangedHeaders } from '../listenForDataChange';
import { listToPool } from './util/listToPool';
import { Lookup } from './util/lookup';

const getPoolsFromCora = (poolTypes: string[]) => {
  const promises = poolTypes.map((type) =>
    getRecordDataListByType<DataListWrapper>(type),
  );
  return Promise.all(promises);
};

let poolsInitialized = false;

const dependencies: Dependencies = {
  textPool: listToPool<BFFText>([]),
  metadataPool: listToPool<BFFMetadata>([]),
  presentationPool: listToPool<BFFPresentation>([]),
  recordTypePool: listToPool<BFFRecordType>([]),
  validationTypePool: listToPool<BFFValidationType>([]),
  searchPool: listToPool<BFFSearch>([]),
  loginUnitPool: listToPool<BFFLoginUnit>([]),
  loginPool: listToPool<BFFLoginWebRedirect>([]),
  memberPool: listToPool<BFFMember>([]),
  organisationPool: listToPool<BFFOrganisation>([]),
  deploymentInfo: {} as DeploymentInfo,
};

export type DependencyType =
  | 'metadata'
  | 'presentation'
  | 'validationType'
  | 'guiElement'
  | 'recordType'
  | 'search'
  | 'loginUnit'
  | 'login'
  | 'diva-member'
  | 'diva-organisation'
  | 'text'
  | 'deploymentInfo';

const loadDependencies = async () => {
  const [
    coraTexts,
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
  ] = await getPoolsFromCora([
    'text',
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
  ]);

  const texts = transformCoraTexts(coraTexts.data);
  dependencies.textPool = listToPool<BFFText>(texts);

  const metadata = transformMetadatas(coraMetadata.data);
  dependencies.metadataPool = listToPool<BFFMetadata>(metadata);

  const presentation = transformCoraPresentations(coraPresentations.data);
  const guiElements = transformCoraPresentations(coraGuiElements.data);
  dependencies.presentationPool = listToPool<
    BFFPresentationBase | BFFPresentationGroup | BFFGuiElement
  >([...presentation, ...guiElements]);

  const validationTypes = transformCoraValidationTypes(
    coraValidationTypes.data,
  );
  dependencies.validationTypePool =
    listToPool<BFFValidationType>(validationTypes);

  const recordTypes = transformCoraRecordTypes(coraRecordTypes.data);
  dependencies.recordTypePool = listToPool<BFFRecordType>(recordTypes);

  const search = transformCoraSearch(coraSearches.data);
  dependencies.searchPool = listToPool<BFFSearch>(search);

  const loginUnit = transformLoginUnits(coraLoginUnits.data);
  dependencies.loginUnitPool = listToPool<BFFLoginUnit>(loginUnit);

  const login = transformLogins(coraLogins.data);
  dependencies.loginPool = listToPool<BFFLoginWebRedirect | BFFLoginPassword>(
    login,
  );

  try {
    const members = await transformMembers(coraMembers.data);
    dependencies.memberPool = listToPool<BFFMember>(members);
  } catch (error) {
    console.error('Error transforming members:', error);
    dependencies.memberPool = new Lookup<string, BFFMember>();
  }

  const organisations = await transformOrganisations(coraOrganisations.data);
  dependencies.organisationPool = listToPool<BFFOrganisation>(organisations);

  dependencies.deploymentInfo = await getDeploymentInfo();

  poolsInitialized = true;
  console.info('Loaded stuff from Cora');
};

export const getDependencies = async () => {
  if (!poolsInitialized) {
    await loadDependencies();
  }

  return dependencies;
};

export const poolTypeMap = {
  recordType: 'recordTypePool',
  metadata: 'metadataPool',
  presentation: 'presentationPool',
  validationType: 'validationTypePool',
  guiElement: 'presentationPool',
  search: 'searchPool',
  loginUnit: 'loginUnitPool',
  login: 'loginPool',
  'diva-member': 'memberPool',
  'diva-organisation': 'organisationPool',
  text: 'textPool',
} as const;

const transformFunctionMap = {
  recordType: transformRecordType,
  metadata: transformMetadata,
  presentation: transformCoraPresentationToBFFPresentation,
  validationType: transformValidationType,
  guiElement: transformCoraPresentationToBFFPresentation,
  search: transformCoraSearchToBFFSearch,
  loginUnit: transformCoraLoginUnitToBFFLoginUnit,
  login: transformCoraLoginToBFFLogin,
  'diva-member': transformMember,
  'diva-organisation': transformOrganisation,
  text: transformCoraTextToBFFText,
} as const;

export const handleDataChanged = async ({
  type,
  id,
  action,
}: DataChangedHeaders) => {
  const poolKey = poolTypeMap[type as keyof typeof poolTypeMap];
  const tranformFunction =
    transformFunctionMap[type as keyof typeof transformFunctionMap];

  if (action === 'delete') {
    dependencies[poolKey].delete(id);
  }

  if (action === 'update' || action === 'create') {
    const recordData = await getRecordDataById<RecordWrapper>(type, id);
    const transformedData = await tranformFunction(
      recordData.data as RecordWrapper,
    );
    const pool = dependencies[poolKey] as Lookup<
      string,
      typeof transformedData
    >;
    pool.set(id, transformedData);
  }
};

export const refreshDependencies = async () => {
  await loadDependencies();
};
