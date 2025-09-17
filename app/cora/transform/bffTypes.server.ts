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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import type { ActionLink } from '@/cora/cora-data/types.server';

export interface BFFRecordLink {
  name: string;
  recordType: string;
  id: string;
  readLink?: ActionLink;
}

export interface BFFBase {
  id: string;
}

export interface BFFRecordType extends BFFBase {
  metadataId: string;
  presentationViewId: string;
  listPresentationViewId: string;
  searchId?: string;
  textId: string;
  defTextId: string;
  groupOfRecordType: string[];
  recordTypeCategory: string[];
}

export interface BFFMetadataBase extends BFFBase {
  nameInData: string;
  type:
    | 'group'
    | 'numberVariable'
    | 'resourceLink'
    | 'collectionItem'
    | 'recordLink'
    | 'textVariable'
    | 'collectionVariable'
    | 'itemCollection';
  textId: string;
  defTextId: string;
}

export type BFFMetadata =
  | BFFMetadataBase
  | BFFMetadataTextVariable
  | BFFMetadataNumberVariable
  | BFFMetadataRecordLink
  | BFFMetadataCollectionVariable
  | BFFMetadataGroup
  | BFFMetadataItemCollection;

export interface BFFAttributeReference {
  refCollectionVarId: string;
}

export interface BFFMetadataTextVariable extends BFFMetadataBase {
  type: 'textVariable';
  regEx: string;
  finalValue?: string;
  attributeReferences?: BFFAttributeReference[];
}

export interface BFFMetadataNumberVariable extends BFFMetadataBase {
  type: 'numberVariable';
  min: string;
  max: string;
  warningMin: string;
  warningMax: string;
  numberOfDecimals: string;
  finalValue?: string;
  attributeReferences?: BFFAttributeReference[];
}

export interface BFFMetadataRecordLink extends BFFMetadataBase {
  type: 'recordLink';
  linkedRecordType: string;
  finalValue?: string;
  attributeReferences?: BFFAttributeReference[];
}

export interface BFFMetadataCollectionVariable extends BFFMetadataBase {
  type: 'collectionVariable';
  refCollection: string;
  finalValue?: string;
  attributeReferences?: BFFAttributeReference[];
}

export interface BFFCollectionItemReference {
  refCollectionItemId: string;
}

export interface BFFMetadataItemCollection extends BFFMetadataBase {
  collectionItemReferences: BFFCollectionItemReference[];
}

export interface BFFMetadataGroup extends BFFMetadataBase {
  type: 'group';
  attributeReferences?: BFFAttributeReference[];
  children: BFFMetadataChildReference[];
}

export interface BFFMetadataChildReference {
  childId: string;
  repeatMin: string;
  repeatMax: string;
  recordPartConstraint?: 'write' | 'readWrite';
}

export interface BFFPresentationBase extends BFFBase {
  type:
    | 'pGroup'
    | 'pVar'
    | 'pNumVar'
    | 'pCollVar'
    | 'container'
    | 'pRecordLink'
    | 'pResourceLink';
  presentationOf: string;
  mode: 'input' | 'output';
  emptyTextId?: string;
  specifiedLabelTextId?: string;
  showLabel?: string;
  inputFormat?: 'password';
  attributesToShow?: 'all' | 'selectable' | 'none';
}

export interface BFFPresentationTextVar extends BFFPresentationBase {
  type: 'pVar';
  inputType: 'input' | 'textarea';
}

export interface BFFPresentationResourceLink extends BFFPresentationBase {
  outputFormat: 'image' | 'download';
  type: 'pResourceLink';
  mode: never;
}

export interface BFFPresentationRecordLink extends BFFPresentationBase {
  linkedRecordPresentations?: BFFLinkedRecordPresentation[];
  search?: string;
  presentAs?: 'onlyTranslatedText' | 'permissionUnit';
}

export interface BFFLinkedRecordPresentation {
  presentedRecordType: string;
  presentationId: string;
}

export interface BFFPresentationContainer extends BFFPresentationBase {
  type: 'container';
  repeat: 'children' | 'this';
  presentationStyle?: string;
  children: BFFPresentationChildReference[];
}

type SurroundingContainerBase = Omit<
  BFFPresentationContainer,
  'presentationOf'
>;

export interface BFFPresentationSurroundingContainer
  extends SurroundingContainerBase {
  presentationsOf?: string[];
}

export interface BFFPresentationGroup extends BFFPresentationBase {
  type: 'pGroup';
  presentationOf: string;
  presentationStyle?: string;
  children: BFFPresentationChildReference[];
  specifiedHeadlineTextId?: string;
  specifiedHeadlineLevel?: string;
  showHeadline?: string;
  presentAs?:
    | 'map'
    | 'recordRelation'
    | 'externalLinkWithValue'
    | 'onlyTranslatedText';
}

export interface BFFPresentationChildReference {
  refGroups: BFFPresentationChildRefGroup[];
  minNumberOfRepeatingToShow?: string;
  textStyle?: TextStyle;
  childStyle?: ChildStyle[];
  presentationSize?: 'firstSmaller' | 'firstLarger' | 'bothEqual';
  title?: string;
  titleHeadlineLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  addText?: string;
}

export type TextStyle =
  | 'h1TextStyle'
  | 'h2TextStyle'
  | 'h3TextStyle'
  | 'h4TextStyle'
  | 'h5TextStyle'
  | 'h6TextStyle'
  | 'bodyTextStyle'
  | 'italicTextStyle'
  | 'boldTextStyle';

export type HeadLineStyle = Omit<
  TextStyle,
  'bodyTextStyle' | 'italicTextStyle' | 'boldTextStyle'
>;

export type ChildStyle =
  | 'zeroChildStyle'
  | 'oneChildStyle'
  | 'twoChildStyle'
  | 'threeChildStyle'
  | 'fourChildStyle'
  | 'fiveChildStyle'
  | 'sixChildStyle'
  | 'sevenChildStyle'
  | 'eightChildStyle'
  | 'nineChildStyle'
  | 'tenChildStyle'
  | 'elevenChildStyle'
  | 'twelveChildStyle'
  | 'compactChildStyle'
  | 'frameChildStyle'
  | 'blockChildStyle';

export interface BFFPresentationChildReference {
  refGroups: BFFPresentationChildRefGroup[];
  minNumberOfRepeatingToShow?: string;
  textStyle?: TextStyle;
  childStyle?: ChildStyle[];
  presentationSize?: 'firstSmaller' | 'firstLarger' | 'bothEqual';
  title?: string;
  titleHeadlineLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  addText?: string;
}

export interface BFFPresentationChildRefGroup {
  childId: string;
  type: 'text' | 'presentation' | 'guiElement';
}

export interface BFFText extends BFFBase {
  sv: string;
  en?: string;
}

export interface BFFSearch extends BFFBase {
  metadataId: string;
  presentationId: string;
  recordTypeToSearchIn: string[];
  searchGroup: 'autocomplete' | 'publicSearch';
  searchDefText: string;
  searchText: string;
  searchResultPresentation?: string;
}

export interface BFFGuiElement extends BFFBase {
  url: string;
  elementText: string;
  presentAs: 'link' | 'image';
  type: string;
}

export type BFFPresentation =
  | BFFPresentationBase
  | BFFPresentationGroup
  | BFFPresentationSurroundingContainer
  | BFFGuiElement
  | BFFPresentationResourceLink;

export interface BFFValidationType extends BFFBase {
  validatesRecordTypeId: string;
  newMetadataGroupId: string;
  metadataGroupId: string;
  newPresentationGroupId: string;
  presentationGroupId: string;
  nameTextId: string;
  defTextId: string;
}

export interface BFFLoginUnit extends BFFBase {
  login: string;
  loginDescription: string;
}

export interface BFFLogin extends BFFBase {
  type: string;
}

export interface BFFLoginWebRedirect extends BFFLogin {
  loginName: string;
  url: string;
}
export interface BFFLoginPassword extends BFFLogin {
  viewDefinition: string;
  viewPresentation: string;
  description: string;
}

export interface BFFResourceLink extends BFFMetadataBase {
  type: 'resourceLink';
}

export interface BFFThemeLink {
  url: string;
  displayLabel: string;
}

export interface BFFThemeLinkWrapper {
  sv: BFFThemeLink;
  en: BFFThemeLink;
}

export interface BFFTheme {
  id: string;
  memberPermissionUnit?: string;
  pageTitle: {
    sv: string;
    en: string;
  };
  backgroundColor: string;
  textColor: string;
  publicLinks?: BFFThemeLinkWrapper[];
  adminLinks?: BFFThemeLinkWrapper[];
  logo: {
    url?: string;
    svg?: string;
  };
  hostnames: string[];
}

export interface BFFOrganisation {
  id: string;
  parentOrganisationId?: string;
  name: {
    sv: string;
    en?: string;
  };
  rorId?: string;
}
