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
  FormSchema,
  RecordFormSchema,
} from '@/components/FormGenerator/types';

export const formDefWithHiddenInputs: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    showLabel: true,
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
        type: 'textVariable',
        name: 'someNameInData',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        validation: {
          type: 'regex',
          pattern: '.?',
        },
        inputType: 'input',
        mode: 'input',
        label: 'someNameInData',
        showLabel: true,
      },
      {
        type: 'hidden',
        name: 'role.roleTerm',
        finalValue: 'pbl',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithHiddenComponents2: FormSchema = {
  form: {
    type: 'group',
    name: 'organisation',
    mode: 'input',
    tooltip: {
      title: 'topOrganisationNewGroupText',
      body: 'topOrganisationNewGroupDefText',
    },
    label: 'topOrganisationNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    components: [
      {
        presentationId: 'namePartPVar',
        name: 'namePart',
        mode: 'input',
        tooltip: {
          title: 'namePartTextVarText',
          body: 'namePartTextVarDefText',
        },
        label: 'namePartTextVarText',
        showLabel: true,
        type: 'textVariable',
        validation: {
          type: 'regex',
          pattern: '.+',
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        childStyle: [],
        gridColSpan: 12,
        inputType: 'input',
      },
      {
        type: 'hidden',
        name: 'genre',
        finalValue: 'topOrganisation',
        attributes: [
          {
            type: 'collectionVariable',
            name: 'type',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'organisationTypeTypeCollectionVarText',
              body: 'organisationTypeTypeCollectionVarDefText',
            },
            label: 'organisationTypeTypeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'organisationType',
                label: 'organisationTypeItemText',
              },
            ],
            finalValue: 'organisationType',
          },
        ],
        attributesToShow: 'none',
      },
    ],
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    gridColSpan: 12,
  },
};
