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

import 'dotenv/config';
import type { DataListWrapper } from '@/cora/cora-data/types.server';
import { transformCoraTexts } from '@/cora/transform/transformTexts.server';
import { transformMetadata } from '@/cora/transform/transformMetadata.server';
import { listToPool } from '@/utils/structs/listToPool';
import type {
  BFFGuiElement,
  BFFLoginPassword,
  BFFLoginUnit,
  BFFLoginWebRedirect,
  BFFMetadata,
  BFFPresentation,
  BFFPresentationBase,
  BFFPresentationGroup,
  BFFRecordType,
  BFFSearch,
  BFFText,
  BFFTheme,
  BFFValidationType,
} from '@/cora/transform/bffTypes.server';
import { transformCoraPresentations } from '@/cora/transform/transformPresentations.server';
import { transformCoraValidationTypes } from '@/cora/transform/transformValidationTypes.server';
import { transformCoraRecordTypes } from '@/cora/transform/transformRecordTypes.server';
import type { Dependencies } from '@/data/formDefinition/formDefinitionsDep.server';
import { transformCoraSearch } from '@/cora/transform/transformCoraSearch.server';
import { transformLoginUnit } from '@/cora/transform/transformLoginUnit.server';
import { transformLogin } from '@/cora/transform/transformLogin.server';
import { getRecordDataListByType } from '@/cora/getRecordDataListByType.server';
import { transformThemes } from '@/cora/transform/transformThemes.server';
import { Lookup } from '@/utils/structs/lookup';

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
};

const loadDependencies = async () => {
  console.info('Loading Cora metadata...');

  const response = await getRecordDataListByType<DataListWrapper>('text');
  const texts = transformCoraTexts(response.data);

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
  ] = await getPoolsFromCora(types);

  const metadata = transformMetadata(coraMetadata.data);
  const metadataPool = listToPool<BFFMetadata>(metadata);
  const presentation = transformCoraPresentations(coraPresentations.data);
  const guiElements = transformCoraPresentations(coraGuiElements.data);

  const presentationPool = listToPool<
    BFFPresentationBase | BFFPresentationGroup | BFFGuiElement
  >([...presentation, ...guiElements]);

  const validationTypes = transformCoraValidationTypes(
    coraValidationTypes.data,
  );
  const validationTypePool = listToPool<BFFValidationType>(validationTypes);

  const recordTypes = transformCoraRecordTypes(coraRecordTypes.data);
  const recordTypePool = listToPool<BFFRecordType>(recordTypes);

  const search = transformCoraSearch(coraSearches.data);
  const searchPool = listToPool<BFFSearch>(search);

  const loginUnit = transformLoginUnit(coraLoginUnits.data);
  const loginUnitPool = listToPool<BFFLoginUnit>(loginUnit);

  const login = transformLogin(coraLogins.data);
  const loginPool = listToPool<BFFLoginWebRedirect | BFFLoginPassword>(login);

  const themes = await transformThemes(coraThemes.data);
  const themePool = groupThemesByHostname(themes);

  dependencies.validationTypePool = validationTypePool;
  dependencies.recordTypePool = recordTypePool;
  dependencies.metadataPool = metadataPool;
  dependencies.presentationPool = presentationPool;
  dependencies.textPool = listToPool<BFFText>(texts);
  dependencies.searchPool = searchPool;
  dependencies.loginUnitPool = loginUnitPool;
  dependencies.loginPool = loginPool;
  dependencies.themePool = themePool;

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
