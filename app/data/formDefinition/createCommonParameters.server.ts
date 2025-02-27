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
  BFFMetadata,
  BFFPresentation,
} from '@/cora/transform/bffTypes.server';
import { removeEmpty } from '@/utils/structs/removeEmpty';

export const createCommonParameters = (
  metadata: BFFMetadata,
  presentation: BFFPresentation,
) => {
  return removeEmpty({
    name: metadata.nameInData,
    type: metadata.type,
    placeholder: getPlaceholder(presentation),
    mode: getMode(presentation),
    inputType: getInputType(presentation),
    tooltip: getTooltip(metadata),
    label: getLabel(metadata, presentation),
    headlineLevel: getHeadlineLevel(presentation),
    showLabel: shouldShowLabel(presentation),
    attributesToShow: getAttributesToShow(presentation),
  });
};

const getAttributesToShow = (presentation: BFFPresentation) => {
  return 'attributesToShow' in presentation
    ? presentation.attributesToShow
    : undefined;
};

const getHeadlineLevel = (presentation: BFFPresentation) => {
  return 'specifiedHeadlineLevel' in presentation
    ? presentation.specifiedHeadlineLevel
    : undefined;
};

const getTooltip = (metadata: BFFMetadata) => {
  return { title: metadata.textId, body: metadata.defTextId };
};

const getInputType = (presentation: BFFPresentation) => {
  return 'inputType' in presentation ? presentation.inputType : undefined;
};

const getMode = (presentation: BFFPresentation) => {
  return 'mode' in presentation ? presentation.mode : undefined;
};

const getPlaceholder = (presentation: BFFPresentation) => {
  return 'emptyTextId' in presentation ? presentation.emptyTextId : undefined;
};

const getLabel = (metadata: BFFMetadata, presentation: BFFPresentation) => {
  if (
    'specifiedHeadlineTextId' in presentation &&
    presentation.specifiedHeadlineTextId
  ) {
    return presentation.specifiedHeadlineTextId;
  }

  if (
    'specifiedLabelTextId' in presentation &&
    presentation.specifiedLabelTextId
  ) {
    return presentation.specifiedLabelTextId;
  }

  return metadata.textId;
};

const shouldShowLabel = (presentation: BFFPresentation) => {
  if ('showLabel' in presentation && presentation.showLabel === 'false') {
    return false;
  }

  if ('showHeadline' in presentation && presentation.showHeadline === 'false') {
    return false;
  }

  return true;
};
