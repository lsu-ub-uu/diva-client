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
  BFFMetadata,
  BFFOrganisation,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFTheme,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import { transformCoraSearch } from '@/cora/transform/transformCoraSearch.server';
import { transformLogin } from '@/cora/transform/transformLogin.server';
import { transformLoginUnit } from '@/cora/transform/transformLoginUnit.server';
import { transformMetadata } from '@/cora/transform/transformMetadata.server';
import { transformOrganisations } from '@/cora/transform/transformOrganisations.server';
import { transformCoraPresentations } from '@/cora/transform/transformPresentations.server';
import { transformCoraRecordTypes } from '@/cora/transform/transformRecordTypes.server';
import { transformCoraTexts } from '@/cora/transform/transformTexts.server';
import { transformThemes } from '@/cora/transform/transformThemes.server';
import { transformCoraValidationTypes } from '@/cora/transform/transformValidationTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { listToPool } from '@/utils/structs/listToPool';
import { Lookup } from '@/utils/structs/lookup';
import { createContext } from 'react-router';
import 'dotenv/config';

const getPoolsFromCora = (poolTypes: string[]) => {
  const promises = poolTypes.map((type) =>
    getRecordDataListByType<DataListWrapper>(type, ''),
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
  themePool: listToPool<BFFTheme>([]),
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
    'diva-theme',
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
    coraThemes,
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
    const themes = await transformThemes(coraThemes.data);
    dependencies.themePool = groupThemesByHostname(themes);
  } catch (error) {
    console.error('Error transforming themes:', error);
    dependencies.themePool = new Lookup<string, BFFTheme>();
  }

  try {
    const organisations = await transformOrganisations(coraOrganisations.data);
    dependencies.organisationPool = listToPool<BFFOrganisation>(organisations);
  } catch (error) {
    console.error('Error transforming organisations:', error);
    dependencies.organisationPool = listToPool<BFFOrganisation>([]);
  }

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

const groupThemesByHostname = (
  themes: BFFTheme[],
): Lookup<string, BFFTheme> => {
  const groupedThemes = new Lookup<string, BFFTheme>();

  themes.forEach((theme) => {
    theme.hostnames.forEach((hostname) => {
      groupedThemes.set(hostname, theme);
    });
  });

  return groupedThemes;
};

export const dependenciesContext = createContext<{
  dependencies: Dependencies;
  refreshDependencies: () => Promise<void>;
}>();
