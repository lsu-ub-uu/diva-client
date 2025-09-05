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

import type { ChildStyle, TextStyle } from '@/cora/transform/bffTypes.server';
import type { RecordLinkSearchPresentation } from '@/data/formDefinition/createPresentation/createRecordLinkSearchPresentation.server';

export interface FormSchema {
  form: FormComponentGroup;
}

export interface RecordFormSchema extends FormSchema {
  validationTypeId: string;
}

export interface SearchFormSchema extends FormSchema {
  recordTypeToSearchIn: string[];
}

export interface FormComponentRepeat {
  repeatMin: number;
  repeatMax: number;
  minNumberOfRepeatingToShow?: number;
}

export interface FormComponentTooltip {
  title: string;
  body: string;
}

export interface LinkedPresentation {
  presentationId: string;
  presentedRecordType: string;
}
export type FormComponentMode = 'input' | 'output' | undefined;

export type FormComponentType =
  | 'recordLink'
  | 'collectionVariable'
  | 'numberVariable'
  | 'textVariable'
  | 'group'
  | 'text'
  | 'container'
  | 'guiElementLink'
  | 'hidden'
  | 'resourceLink';

export type FormComponentWithDataType = Omit<
  FormComponentType,
  'guiElementLink' | 'text'
>;

export interface FormComponentBase {
  presentationId?: string;
  type: FormComponentType;
  name: string;
  alternativePresentation?: FormComponent;
}

export interface FormComponentMetadata extends FormComponentBase {
  placeholder?: string;
  mode?: FormComponentMode;
  tooltip?: FormComponentTooltip;
  headlineLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  attributesToShow?: 'all' | 'selectable' | 'none';
  repeat?: FormComponentRepeat;
  finalValue?: string;
  gridColSpan?: number;
  childStyle?: ChildStyle[];
  textStyle?: TextStyle;
  presentationStyle?: string;
  presentationSize?: PresentationSize;
  title?: string;
  titleHeadlineLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export type PresentationSize =
  | 'firstSmaller'
  | 'firstLarger'
  | 'bothEqual'
  | 'singleInitiallyVisible'
  | 'singleInitiallyHidden';

export interface FormComponentTextVar extends FormComponentMetadata {
  inputType: 'input' | 'textarea';
  inputFormat?: 'password';
  validation?: FormRegexValidation;
  attributes?: FormAttributeCollection[];
  label: string;
  showLabel: boolean;
}

export interface FormComponentHidden extends FormComponentBase {
  type: 'hidden';
  finalValue: string;
  attributes?: FormAttributeCollection[];
  attributesToShow: 'none';
}

export interface FormComponentNumVar extends FormComponentMetadata {
  validation?: FormNumberValidation;
  attributes?: FormAttributeCollection[];
  label: string;
  showLabel: boolean;
}
export interface FormComponentCollVar extends FormComponentMetadata {
  options: FormComponentCollItem[];
  attributes?: FormAttributeCollection[];
  label: string;
  showLabel: boolean;
}

export interface FormComponentCollItem {
  value: string;
  label: string;
}

export interface FormComponentRecordLink extends FormComponentMetadata {
  attributes?: FormAttributeCollection[];
  recordLinkType?: string;
  presentationRecordLinkId?: string;
  searchPresentation?: RecordLinkSearchPresentation;
  linkedRecordPresentation?: LinkedPresentation;
  label: string;
  showLabel: boolean;
  presentAs?: 'onlyTranslatedText' | 'permissionUnit';
}

export interface FormComponentResourceLink extends FormComponentMetadata {
  outputFormat: 'image' | 'download';
  attributes?: FormAttributeCollection[];
  label: string;
  showLabel: boolean;
}

export interface FormComponentContainer extends FormComponentMetadata {
  containerType?: 'repeating' | 'surrounding';
  components?: FormComponent[];
}

export interface FormComponentGroup extends FormComponentMetadata {
  attributes?: FormAttributeCollection[];
  components?: FormComponent[];
  label: string;
  showLabel: boolean;
  presentAs?:
    | 'map'
    | 'recordRelation'
    | 'externalLinkWithValue'
    | 'onlyTranslatedText';
}

export interface FormComponentText extends FormComponentMetadata {
  type: 'text';
}

export interface FormComponentGuiElement extends FormComponentBase {
  url: string;
  elementText: string;
  presentAs: 'link' | 'image';
}

export type FormComponent =
  | FormComponentTextVar
  | FormComponentNumVar
  | FormComponentCollVar
  | FormComponentRecordLink
  | FormComponentContainer
  | FormComponentGroup
  | FormComponentText
  | FormComponentGuiElement
  | FormComponentHidden
  | FormComponentResourceLink;

export type FormComponentWithData =
  | FormComponentTextVar
  | FormComponentNumVar
  | FormComponentCollVar
  | FormComponentRecordLink
  | FormComponentGroup;

export type FormComponentLeaf = Exclude<
  FormComponentWithData,
  FormComponentGroup
>;

export type FormAttributeCollection = Omit<
  FormComponentCollVar,
  'repeat' | 'inputType' | 'attributes'
>;

export interface FormRegexValidation {
  type: 'regex';
  pattern: string;
}

export interface FormNumberValidation {
  type: 'number';
  min: number;
  max: number;
  warningMin: number;
  warningMax: number;
  numberOfDecimals: number;
}
