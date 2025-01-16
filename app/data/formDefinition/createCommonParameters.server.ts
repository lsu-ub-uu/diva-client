/*
 * Copyright 2025 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type {
  BFFMetadataBase,
  BFFPresentationBase,
  BFFPresentationGroup,
} from '@/cora/transform/bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export const createCommonParameters = (
  metadata: BFFMetadataBase,
  presentation: BFFPresentationBase | BFFPresentationGroup,
) => {
  const name = metadata.nameInData;
  const { type } = metadata;
  const placeholder = presentation.emptyTextId;
  const { mode, inputType } = presentation;
  const tooltip = { title: metadata.textId, body: metadata.defTextId };
  let label = presentation.specifiedLabelTextId
    ? presentation.specifiedLabelTextId
    : metadata.textId;
  let showLabel = true;
  let headlineLevel;
  let attributesToShow;

  const presentationGroup = presentation as BFFPresentationGroup;

  if (
    checkIfSpecifiedHeadlineTextIdExist(presentationGroup) &&
    presentationGroup.specifiedHeadlineTextId !== undefined
  ) {
    label = presentationGroup.specifiedHeadlineTextId;
  }

  if (
    checkIfSpecifiedHeadlineLevelExist(presentationGroup) &&
    presentationGroup.specifiedHeadlineLevel !== undefined
  ) {
    headlineLevel = presentationGroup.specifiedHeadlineLevel;
  }

  if (
    checkIfShowHeadlineExist(presentationGroup) &&
    presentationGroup.showHeadline === 'false'
  ) {
    showLabel = false;
  }

  if (presentation.showLabel && presentation.showLabel === 'false') {
    showLabel = false;
  }

  if (checkIfAttributesToShowExist(presentation)) {
    attributesToShow = presentation.attributesToShow;
  }

  return removeEmpty({
    name,
    type,
    placeholder,
    mode,
    inputType,
    tooltip,
    label,
    headlineLevel,
    showLabel,
    attributesToShow,
  });
};

const checkIfSpecifiedHeadlineTextIdExist = (
  presentation: BFFPresentationGroup,
) => {
  return Object.hasOwn(presentation, 'specifiedHeadlineTextId');
};

const checkIfSpecifiedHeadlineLevelExist = (
  presentation: BFFPresentationGroup,
) => {
  return Object.hasOwn(presentation, 'specifiedHeadlineLevel');
};

const checkIfShowHeadlineExist = (presentation: BFFPresentationGroup) => {
  return Object.hasOwn(presentation, 'showHeadline');
};

const checkIfAttributesToShowExist = (presentation: BFFPresentationBase) => {
  return Object.hasOwn(presentation, 'attributesToShow');
};
