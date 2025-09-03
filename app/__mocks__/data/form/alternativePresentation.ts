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
 */

import type {
  PresentationSize,
  RecordFormSchema,
} from '@/components/FormGenerator/types';

export const createAlternativePresentationFormDef = (
  presentationSize?: PresentationSize,
  title?: string,
  alternativePresentation?: boolean,
): RecordFormSchema => ({
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
        showLabel: true,
        label: 'someLabelTextId',
        placeholder: 'someEmptyTextId',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        validation: {
          type: 'regex',
          pattern: '^[a-zA-Z]$',
        },
        inputType: 'input',
        mode: 'input',
        title: title,
        titleHeadlineLevel: 'h4',
        presentationSize,
        alternativePresentation: alternativePresentation
          ? {
              type: 'textVariable',
              name: 'someNameInData',
              showLabel: true,
              label: 'someAlternativeLabelTextId',
              placeholder: 'someEmptyTextId',
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              validation: {
                type: 'regex',
                pattern: '^[a-zA-Z]$',
              },
              inputType: 'input',
              mode: 'input',
            }
          : undefined,
      },
    ],
    mode: 'input',
  },
});

export const alternativePresentationWithMinNumberRepeatingToShow: RecordFormSchema =
  {
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
          showLabel: true,
          label: 'someLabelTextId',
          placeholder: 'someEmptyTextId',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          validation: {
            type: 'regex',
            pattern: '^[a-zA-Z]$',
          },
          inputType: 'input',
          mode: 'input',
          title: 'someTitle',
          titleHeadlineLevel: 'h4',
          alternativePresentation: {
            type: 'textVariable',
            name: 'someAlternativeNameInData',
            showLabel: true,
            label: 'someAlternativeLabelTextId',
            placeholder: 'someEmptyTextId'app/__mocks__,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            validation: {
              type: 'regex',
              pattern: '^[a-zA-Z]$',
            },
            inputType: 'input',
            mode: 'input',
          },
        },
      ],
      mode: 'input',
    },
  };
