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

export const formDefWithAlternativePresentationsWithSContainersFirstSmaller: RecordFormSchema =
  {
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      showLabel: true,
      label: 'someRootFormGroupText',
      name: 'someRootNameInData',
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 1,
        repeatMax: 1,
      },
      tooltip: {
        title: 'textId345',
        body: 'defTextId678',
      },
      components: [
        {
          presentationId: 'affiliationPersonalPGroup',
          type: 'group',
          name: 'affiliation',
          mode: 'input',
          tooltip: {
            title: 'affiliationPersonalGroupText',
            body: 'affiliationPersonalGroupDefText',
          },
          label: 'affiliationPersonalGroupText',
          showLabel: true,
          attributesToShow: 'selectable',
          components: [
            {
              presentationId: 'affiliationPersonalSContainer',
              type: 'container',
              name: 'affiliationPersonalSContainer',
              mode: 'input',
              containerType: 'surrounding',
              alternativePresentation: {
                presentationId: 'affiliationPersonalSContainer',
                type: 'container',
                name: 'affiliationPersonalSContainer',
                mode: 'input',
                containerType: 'surrounding',
                components: [
                  {
                    presentationId: 'somePVar',
                    name: 'someTextVar',
                    mode: 'input',
                    label: 'someTextVarText',
                    showLabel: true,
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '.*',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                  {
                    presentationId: 'somePVar',
                    name: 'someOtherTextVar',
                    mode: 'input',
                    label: 'someOtherTextVarText',
                    showLabel: true,
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '.*',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                ],
                childStyle: [],
                gridColSpan: 12,
                presentationSize: 'firstSmaller',
              },
              components: [
                {
                  presentationId: 'somePVar',
                  name: 'someTextVar',
                  mode: 'input',
                  label: 'someTextVarText',
                  showLabel: true,
                  type: 'textVariable',
                  validation: {
                    type: 'regex',
                    pattern: '.*',
                  },
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 0,
                    repeatMax: 1,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                  inputType: 'input',
                },
              ],
              childStyle: [],
              gridColSpan: 12,
              presentationSize: 'firstSmaller',
            },
          ],
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308,
          },
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      mode: 'input',
    },
  };

export const formDefWithAlternativePresentationsWithSContainersSecondSmaller: RecordFormSchema =
  {
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      showLabel: true,
      label: 'someRootFormGroupText',
      name: 'someRootNameInData',
      repeat: {
        minNumberOfRepeatingToShow: 1,
        repeatMin: 1,
        repeatMax: 1,
      },
      tooltip: {
        title: 'textId345',
        body: 'defTextId678',
      },
      components: [
        {
          presentationId: 'affiliationPersonalPGroup',
          type: 'group',
          name: 'affiliation',
          mode: 'input',
          tooltip: {
            title: 'affiliationPersonalGroupText',
            body: 'affiliationPersonalGroupDefText',
          },
          label: 'affiliationPersonalGroupText',
          showLabel: true,
          attributesToShow: 'selectable',
          components: [
            {
              presentationId: 'affiliationPersonalSContainer',
              type: 'container',
              name: 'affiliationPersonalSContainer',
              mode: 'input',
              containerType: 'surrounding',
              alternativePresentation: {
                presentationId: 'affiliationPersonalSContainer',
                type: 'container',
                name: 'affiliationPersonalSContainer',
                mode: 'input',
                containerType: 'surrounding',
                components: [
                  {
                    presentationId: 'somePVar',
                    name: 'someTextVar',
                    mode: 'input',
                    label: 'someTextVarText',
                    showLabel: true,
                    type: 'textVariable',
                    validation: {
                      type: 'regex',
                      pattern: '.*',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [],
                    gridColSpan: 12,
                    inputType: 'input',
                  },
                ],
                childStyle: [],
                gridColSpan: 12,
                presentationSize: 'firstSmaller',
              },
              components: [
                {
                  presentationId: 'somePVar',
                  name: 'someTextVar',
                  mode: 'input',
                  label: 'someTextVarText',
                  showLabel: true,
                  type: 'textVariable',
                  validation: {
                    type: 'regex',
                    pattern: '.*',
                  },
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 0,
                    repeatMax: 1,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                  inputType: 'input',
                },
                {
                  presentationId: 'somePVar',
                  name: 'someOtherTextVar',
                  mode: 'input',
                  label: 'someOtherTextVarText',
                  showLabel: true,
                  type: 'textVariable',
                  validation: {
                    type: 'regex',
                    pattern: '.*',
                  },
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 0,
                    repeatMax: 1,
                  },
                  childStyle: [],
                  gridColSpan: 12,
                  inputType: 'input',
                },
              ],
              childStyle: [],
              gridColSpan: 12,
              presentationSize: 'firstSmaller',
            },
          ],
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308,
          },
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      mode: 'input',
    },
  };
