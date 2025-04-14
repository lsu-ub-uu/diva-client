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

import type { RecordFormSchema } from '@/components/FormGenerator/types';

export const formDefWithOneRecordLinkBeingOptional: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    showLabel: true,
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        type: 'recordLink',
        name: 'nationalSubjectCategory',
        mode: 'input',
        repeat: {
          repeatMin: 0,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOneRecordLinkBeingRequired: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    showLabel: true,
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        type: 'recordLink',
        name: 'nationalSubjectCategory',
        mode: 'input',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
    ],
    mode: 'input',
  },
};

export const formDefWithRecordLinkTypeBinary: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    showLabel: true,
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        childStyle: [],
        gridColSpan: 12,
        name: 'attachmentFile',
        type: 'recordLink',
        mode: 'input',
        tooltip: {
          title: 'attachmentFileLinkText',
          body: 'attachmentFileLinkDefText',
        },
        label: 'attachmentFileLinkText',
        showLabel: true,
        recordLinkType: 'binary',
        linkedRecordPresentation: {
          presentedRecordType: 'binary',
          presentationId: 'imageGroupWhenLinkedOutputInInputPGroup',
        },
        presentationRecordLinkId: 'attachmentFilePLink',
      },
    ],
    mode: 'input',
  },
};
