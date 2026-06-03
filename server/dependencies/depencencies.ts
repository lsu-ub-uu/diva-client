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
  BFFClientContent,
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
} from '@/cora/bffTypes.server';
import type {
  DataListWrapper,
  RecordWrapper,
} from '@/cora/cora-data/types.server';
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
import type { DataChangedEvent } from '../listenForDataChange';
import { clearI18nCache } from '../i18n';
import { listToPool } from './util/listToPool';
import { Lookup } from './util/lookup';
import { transformClientContent } from '@/cora/transform/transformClientContent.server';

const getPoolsFromCora = (poolTypes: string[]) => {
  const promises = poolTypes.map((type) =>
    getRecordDataListByType<DataListWrapper>(type),
  );
  return Promise.all(promises);
};

// Use a promise guard to prevent multiple concurrent initializations
let initializationPromise: Promise<void> | null = null;
let cacheState: 'cold' | 'warming' | 'ready' = 'cold';
const eventBuffer = new Map<string, DataChangedEvent>();

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
  clientContent: listToPool<BFFClientContent>([]),
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
  | 'text';

const loadDependencies = async () => {
  console.info('Loading stuff from Cora...');
  cacheState = 'warming';
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
    clientContents,
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
    'diva-clientContent',
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
    const members = transformMembers(coraMembers.data);
    dependencies.memberPool = listToPool<BFFMember>(members);
  } catch (error) {
    console.error('Error transforming members:', error);
    dependencies.memberPool = new Lookup<string, BFFMember>();
  }

  const organisations = await transformOrganisations(coraOrganisations.data);
  dependencies.organisationPool = listToPool<BFFOrganisation>(organisations);

  for (const event of eventBuffer.values()) {
    await applyDataChangeEvent(event);
  }

  dependencies.clientContent = listToPool<BFFClientContent>(
    transformClientContent(clientContents.data),
  );
  eventBuffer.clear();
  cacheState = 'ready';
  console.info('Loaded stuff from Cora');
};

export const getDependencies = async () => {
  if (!initializationPromise) {
    initializationPromise = loadDependencies();
  }
  await initializationPromise;

  return dependencies;
};

export const getClientContent = (dependencies: Dependencies) => {
  return dependencies.clientContent.get('diva-clientContent');
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
  'diva-clientContent': 'clientContent',
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
  clientContent: transformClientContent,
  text: transformCoraTextToBFFText,
} as const;

export const handleDataChanged = async (event: DataChangedEvent) => {
  if (cacheState !== 'ready') {
    eventBuffer.set(`${event.type}-${event.id}`, event);
  } else {
    await applyDataChangeEvent(event);
  }
};

const applyDataChangeEvent = async ({ type, id, action }: DataChangedEvent) => {
  const poolKey = poolTypeMap[type as keyof typeof poolTypeMap];
  const tranformFunction =
    transformFunctionMap[type as keyof typeof transformFunctionMap];

  if (!poolKey || !tranformFunction) {
    return;
  }

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

  // Clear i18n cache when text pool changes so translations are refreshed
  if (type === 'text') {
    clearI18nCache();
  }
};

export const refreshDependencies = async () => {
  await loadDependencies();
  clearI18nCache();
};
