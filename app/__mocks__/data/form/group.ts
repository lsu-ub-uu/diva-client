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

export const formDefWithOneGroupHavingTextVariableAsChild: RecordFormSchema = {
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
        type: 'group',
        presentationId: 'someChildGroupNameInDataGroup',
        label: 'someChildGroupTextId',
        name: 'someChildGroupNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        tooltip: {
          title: 'someChildGroupTextId',
          body: 'someChildGroupDefTextId',
        },
        components: [
          {
            type: 'textVariable',
            name: 'someNameInData',
            presentationId: 'someNameInDataVar',
            label: 'someTextId',
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            tooltip: {
              title: 'someTextId',
              body: 'someDefTextId',
            },
            validation: {
              type: 'regex',
              pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{3,50}$)',
            },
            mode: 'input',
            inputType: 'input',
          },
        ],
        mode: 'input',
      },
    ],
    mode: 'input',
  },
};

export const formDefWithGroupWithSpecifiedHeadlineLevel: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    presentationId: 'somePGroup',
    label: 'someRootFormGroupText',
    showLabel: true,
    headlineLevel: 'h1',
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
        name: 'author',
        type: 'group',
        presentationId: 'authorGroup',
        mode: 'input',
        headlineLevel: 'h3',
        showLabel: true,
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'author',
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 10,
        },
        attributes: [
          {
            type: 'collectionVariable',
            presentationId: 'eyeColorCollVar',
            name: 'eyeColor',
            showLabel: true,
            placeholder: 'Select eye color',
            tooltip: {
              title: 'Eye color',
              body: 'state the author eye color',
            },
            finalValue: 'blue',
            label: 'Eye color',
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' },
            ],
            mode: 'input',
          },
        ],
        components: [
          {
            type: 'text',
            presentationId: 'somePText',
            name: 'presentationTypeTextCollectionVarDefText',
          },
          {
            type: 'textVariable',
            presentationId: 'someNameInDataVar',
            name: 'someNameInData',
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
          },
        ],
      },
    ],
    mode: 'input',
  },
};

export const formDefWithGroupWithDefaultHeadlineLevel: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    presentationId: 'somePGroup',
    showLabel: true,
    label: 'someRootFormGroupText',
    headlineLevel: 'h1',
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
        name: 'author',
        presentationId: 'somePGroup',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'author',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 10,
        },
        attributes: [
          {
            type: 'numberVariable',
            presentationId: 'somePColVar',
            name: 'eyeColor',
            showLabel: true,
            placeholder: 'Select eye color',
            tooltip: {
              title: 'Eye color',
              body: 'state the author eye color',
            },
            finalValue: 'blue',
            label: 'Eye color',
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' },
            ],
            mode: 'input',
          },
        ],
        components: [
          {
            type: 'text',
            presentationId: 'somePText',
            name: 'presentationTypeTextCollectionVarDefText',
          },
          {
            type: 'textVariable',
            name: 'someNameInData',
            presentationId: 'someNameInDataVar',
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
          },
        ],
      },
    ],
    mode: 'input',
  },
};

export const formDefWithOptionalGroupWithRequiredTextVar: RecordFormSchema = {
  validationTypeId: 'thesisManuscript',
  form: {
    name: 'divaOutput',
    type: 'group',
    presentationId: 'somePGroup',
    mode: 'input',
    tooltip: {
      title: 'thesisManuscriptNewGroupText',
      body: 'thesisManuscriptNewGroupDefText',
    },
    label: 'thesisManuscriptNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'alternativeTitle',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'alternativeTitleGroupText',
          body: 'alternativeTitleGroupDefText',
        },
        label: 'alternativeTitleGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        components: [
          {
            name: 'mainTitle',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'mainTitleTextVarText',
              body: 'mainTitleTextVarDefText',
            },
            label: 'mainTitleTextVarText',
            showLabel: true,
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
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefWithOptionalGroupWithRequiredNumberVar: RecordFormSchema = {
  validationTypeId: 'thesisManuscript',
  form: {
    name: 'divaOutput',
    type: 'group',
    presentationId: 'somePGroup',
    mode: 'input',
    tooltip: {
      title: 'thesisManuscriptNewGroupText',
      body: 'thesisManuscriptNewGroupDefText',
    },
    label: 'thesisManuscriptNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'alternativeTitle',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'alternativeTitleGroupText',
          body: 'alternativeTitleGroupDefText',
        },
        label: 'alternativeTitleGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        components: [
          {
            type: 'numberVariable',
            presentationId: 'somePNumVar',
            name: 'someNameInDataNumberVar',
            label: 'someNumberVarTextId', // hidden
            showLabel: false,
            gridColSpan: 3,
            childStyle: ['threeChildStyle'],
            placeholder: 'someEmptyTextId',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
              minNumberOfRepeatingToShow: 1,
            },
            tooltip: {
              title: 'someNumberVarTextId',
              body: 'someNumberVarDefTextId',
            },
            validation: {
              type: 'number',
              min: 0,
              max: 20,
              warningMin: 2,
              warningMax: 10,
              numberOfDecimals: 0,
            },
            mode: 'input',
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefWithOptionalGroupWithRequiredRecordLink: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'alternativeTitle',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'alternativeTitleGroupText',
            body: 'alternativeTitleGroupDefText',
          },
          label: 'alternativeTitleGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          components: [
            {
              name: 'funder',
              type: 'recordLink',
              mode: 'input',
              tooltip: {
                title: 'funderLinkText',
                body: 'funderLinkDefText',
              },
              label: 'funderLinkText',
              showLabel: true,
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              recordLinkType: 'funder',
              presentationRecordLinkId: 'funderPLink',
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefWithWithOptionalGroupWithRequiredVar: RecordFormSchema = {
  validationTypeId: 'diva-output',
  form: {
    name: 'output',
    type: 'group',
    presentationId: 'somePGroup',
    mode: 'input',
    tooltip: {
      title: 'outputNewGroupText',
      body: 'outputNewGroupDefText',
    },
    label: 'outputNewGroupText',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'name',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'namePersonalGroupText',
          body: 'namePersonalGroupDefText',
        },
        label: 'namePersonalGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        attributes: [
          {
            name: 'type',
            type: 'numberVariable',
            presentationId: 'somePColVar',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'typeCollectionVarText',
              body: 'typeCollectionVarDefText',
            },
            label: 'typeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'code',
                label: 'codeItemText',
              },
              {
                value: 'contentType',
                label: 'contentTypeItemText',
              },
              {
                value: 'creatorCount',
                label: 'creatorCountItemText',
              },
              {
                value: 'restrictionOnAccess',
                label: 'restrictionOnAccessItemText',
              },
              {
                value: 'publicationStatus',
                label: 'publicationStatusItemText',
              },
              {
                value: 'corporate',
                label: 'corporateItemText',
              },
              {
                value: 'personal',
                label: 'personalItemText',
              },
              {
                value: 'given',
                label: 'givenItemText',
              },
              {
                value: 'family',
                label: 'familyItemText',
              },
              {
                value: 'termsOfAddress',
                label: 'termsOfAddressItemText',
              },
              {
                value: 'series',
                label: 'seriesItemText',
              },
              {
                value: 'conference-publication',
                label: 'conferencePublicationItemText',
              },
              {
                value: 'statement_of_responsibility',
                label: 'statementOfResponsibilityItemText',
              },
              {
                value: 'book',
                label: 'bookItemText',
              },
              {
                value: 'journal',
                label: 'journalItemText',
              },
              {
                value: 'artNo',
                label: 'artNoItemText',
              },
              {
                value: 'issue',
                label: 'issueItemText',
              },
              {
                value: 'volume',
                label: 'volumeItemText',
              },
              {
                value: 'conference',
                label: 'conferenceItemText',
              },
              {
                value: 'initiative',
                label: 'initiativeItemText',
              },
              {
                value: 'funder',
                label: 'funderItemText',
              },
              {
                value: 'project',
                label: 'projectItemText',
              },
              {
                value: 'constituent',
                label: 'constituentItemText',
              },
              {
                value: 'thesis',
                label: 'thesisItemText',
              },
              {
                value: 'defence',
                label: 'defenceItemText',
              },
              {
                value: 'researchData',
                label: 'researchDataItemText',
              },
              {
                value: 'outputType',
                label: 'outputTypeItemText',
              },
              {
                value: 'internal',
                label: 'internalItemText',
              },
              {
                value: 'online',
                label: 'onlineItemText',
              },
              {
                value: 'biographical',
                label: 'biographicalItemText',
              },
              {
                value: 'patent',
                label: 'patentItemText',
              },
            ],
            finalValue: 'personal',
          },
        ],
        components: [
          {
            name: 'namePart',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'namePartGivenTextVarText',
              body: 'namePartGivenTextVarDefText',
            },
            label: 'namePartGivenTextVarText',
            placeholder: 'namePartGivenTextVarText',
            showLabel: true,
            attributesToShow: 'selectable',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            attributes: [
              {
                name: 'type',
                type: 'numberVariable',
                presentationId: 'somePColVar',
                placeholder: 'initialEmptyValueText',
                mode: 'input',
                tooltip: {
                  title: 'typeCollectionVarText',
                  body: 'typeCollectionVarDefText',
                },
                label: 'typeCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'code',
                    label: 'codeItemText',
                  },
                  {
                    value: 'contentType',
                    label: 'contentTypeItemText',
                  },
                  {
                    value: 'creatorCount',
                    label: 'creatorCountItemText',
                  },
                  {
                    value: 'restrictionOnAccess',
                    label: 'restrictionOnAccessItemText',
                  },
                  {
                    value: 'publicationStatus',
                    label: 'publicationStatusItemText',
                  },
                  {
                    value: 'corporate',
                    label: 'corporateItemText',
                  },
                  {
                    value: 'personal',
                    label: 'personalItemText',
                  },
                  {
                    value: 'given',
                    label: 'givenItemText',
                  },
                  {
                    value: 'family',
                    label: 'familyItemText',
                  },
                  {
                    value: 'termsOfAddress',
                    label: 'termsOfAddressItemText',
                  },
                  {
                    value: 'series',
                    label: 'seriesItemText',
                  },
                  {
                    value: 'conference-publication',
                    label: 'conferencePublicationItemText',
                  },
                  {
                    value: 'statement_of_responsibility',
                    label: 'statementOfResponsibilityItemText',
                  },
                  {
                    value: 'book',
                    label: 'bookItemText',
                  },
                  {
                    value: 'journal',
                    label: 'journalItemText',
                  },
                  {
                    value: 'artNo',
                    label: 'artNoItemText',
                  },
                  {
                    value: 'issue',
                    label: 'issueItemText',
                  },
                  {
                    value: 'volume',
                    label: 'volumeItemText',
                  },
                  {
                    value: 'conference',
                    label: 'conferenceItemText',
                  },
                  {
                    value: 'initiative',
                    label: 'initiativeItemText',
                  },
                  {
                    value: 'funder',
                    label: 'funderItemText',
                  },
                  {
                    value: 'project',
                    label: 'projectItemText',
                  },
                  {
                    value: 'constituent',
                    label: 'constituentItemText',
                  },
                  {
                    value: 'thesis',
                    label: 'thesisItemText',
                  },
                  {
                    value: 'defence',
                    label: 'defenceItemText',
                  },
                  {
                    value: 'researchData',
                    label: 'researchDataItemText',
                  },
                  {
                    value: 'outputType',
                    label: 'outputTypeItemText',
                  },
                  {
                    value: 'internal',
                    label: 'internalItemText',
                  },
                  {
                    value: 'online',
                    label: 'onlineItemText',
                  },
                  {
                    value: 'biographical',
                    label: 'biographicalItemText',
                  },
                  {
                    value: 'patent',
                    label: 'patentItemText',
                  },
                ],
                finalValue: 'given',
              },
            ],
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'namePart',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'namePartFamilyTextVarText',
              body: 'namePartFamilyTextVarDefText',
            },
            label: 'namePartFamilyTextVarText',
            showLabel: true,
            attributesToShow: 'selectable',
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            attributes: [
              {
                name: 'type',
                type: 'numberVariable',
                presentationId: 'somePColVar',
                placeholder: 'initialEmptyValueText',
                mode: 'input',
                tooltip: {
                  title: 'typeCollectionVarText',
                  body: 'typeCollectionVarDefText',
                },
                label: 'typeCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'code',
                    label: 'codeItemText',
                  },
                  {
                    value: 'contentType',
                    label: 'contentTypeItemText',
                  },
                  {
                    value: 'creatorCount',
                    label: 'creatorCountItemText',
                  },
                  {
                    value: 'restrictionOnAccess',
                    label: 'restrictionOnAccessItemText',
                  },
                  {
                    value: 'publicationStatus',
                    label: 'publicationStatusItemText',
                  },
                  {
                    value: 'corporate',
                    label: 'corporateItemText',
                  },
                  {
                    value: 'personal',
                    label: 'personalItemText',
                  },
                  {
                    value: 'given',
                    label: 'givenItemText',
                  },
                  {
                    value: 'family',
                    label: 'familyItemText',
                  },
                  {
                    value: 'termsOfAddress',
                    label: 'termsOfAddressItemText',
                  },
                  {
                    value: 'series',
                    label: 'seriesItemText',
                  },
                  {
                    value: 'conference-publication',
                    label: 'conferencePublicationItemText',
                  },
                  {
                    value: 'statement_of_responsibility',
                    label: 'statementOfResponsibilityItemText',
                  },
                  {
                    value: 'book',
                    label: 'bookItemText',
                  },
                  {
                    value: 'journal',
                    label: 'journalItemText',
                  },
                  {
                    value: 'artNo',
                    label: 'artNoItemText',
                  },
                  {
                    value: 'issue',
                    label: 'issueItemText',
                  },
                  {
                    value: 'volume',
                    label: 'volumeItemText',
                  },
                  {
                    value: 'conference',
                    label: 'conferenceItemText',
                  },
                  {
                    value: 'initiative',
                    label: 'initiativeItemText',
                  },
                  {
                    value: 'funder',
                    label: 'funderItemText',
                  },
                  {
                    value: 'project',
                    label: 'projectItemText',
                  },
                  {
                    value: 'constituent',
                    label: 'constituentItemText',
                  },
                  {
                    value: 'thesis',
                    label: 'thesisItemText',
                  },
                  {
                    value: 'defence',
                    label: 'defenceItemText',
                  },
                  {
                    value: 'researchData',
                    label: 'researchDataItemText',
                  },
                  {
                    value: 'outputType',
                    label: 'outputTypeItemText',
                  },
                  {
                    value: 'internal',
                    label: 'internalItemText',
                  },
                  {
                    value: 'online',
                    label: 'onlineItemText',
                  },
                  {
                    value: 'biographical',
                    label: 'biographicalItemText',
                  },
                  {
                    value: 'patent',
                    label: 'patentItemText',
                  },
                ],
                finalValue: 'family',
              },
            ],
            childStyle: [],
            gridColSpan: 12,
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefWithOptionalGroupWithLongitudeAndLatitudeNumberVars: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'point',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'pointGroupText',
            body: 'pointGroupDefText',
          },
          label: 'pointGroupText',
          headlineLevel: 'h3',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0, // For the test
            repeatMax: 1.7976931348623157e308,
          },
          components: [
            {
              name: 'longitude',
              type: 'numberVariable',
              presentationId: 'somePNumVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'longitudeTextVarText',
                body: 'longitudeTextVarDefText',
              },
              label: 'longitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'number',
                min: 1,
                max: 20,
                warningMin: 2,
                warningMax: 10,
                numberOfDecimals: 0,
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLongitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'latitude',
              type: 'numberVariable',
              presentationId: 'somePNumVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'latitudeTextVarText',
                body: 'latitudeTextVarDefText',
              },
              label: 'latitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'number',
                min: 1,
                max: 20,
                warningMin: 2,
                warningMax: 10,
                numberOfDecimals: 0,
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLatitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefWithOptionalGroupWithLongitudeAndLatitudeTextVars: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'point',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'pointGroupText',
            body: 'pointGroupDefText',
          },
          label: 'pointGroupText',
          headlineLevel: 'h3',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0, // For the test
            repeatMax: 1.7976931348623157e308,
          },
          components: [
            {
              name: 'longitude',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'longitudeTextVarText',
                body: 'longitudeTextVarDefText',
              },
              label: 'longitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern:
                  '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLongitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'latitude',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'latitudeTextVarText',
                body: 'latitudeTextVarDefText',
              },
              label: 'latitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern:
                  '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLatitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefWithOptionalGroupWithMixOptionalAndRequiredTextVars: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'point',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'pointGroupText',
            body: 'pointGroupDefText',
          },
          label: 'pointGroupText',
          headlineLevel: 'h3',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1.7976931348623157e308,
          },
          components: [
            {
              name: 'longitude',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'longitudeTextVarText',
                body: 'longitudeTextVarDefText',
              },
              label: 'longitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern:
                  '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              placeholder: 'someLongitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'latitude',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'longitudeTextVarText',
                body: 'longitudeTextVarDefText',
              },
              label: 'longitudeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern:
                  '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              placeholder: 'someLatitudeTextId',
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefWithOptionalGroupWithNestedOptionalGroupWithTextVar: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'polygon',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'polygonGroupText',
            body: 'polygonGroupDefText',
          },
          label: 'polygonGroupText',
          showLabel: false,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          components: [
            {
              name: 'point',
              type: 'group',
              presentationId: 'somePGroup',
              mode: 'input',
              tooltip: {
                title: 'pointGroupText',
                body: 'pointGroupDefText',
              },
              label: 'pointGroupText',
              headlineLevel: 'h3',
              showLabel: true,
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1.7976931348623157e308,
              },
              components: [
                {
                  name: 'longitude',
                  type: 'numberVariable',
                  presentationId: 'somePTextVar',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'longitudeTextVarText',
                    body: 'longitudeTextVarDefText',
                  },
                  label: 'longitudeTextVarText',
                  showLabel: true,
                  validation: {
                    type: 'regex',
                    pattern:
                      '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
                  },
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  childStyle: ['sixChildStyle'],
                  gridColSpan: 6,
                },
              ],
              presentationStyle: '',
              childStyle: [],
              gridColSpan: 12,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefWithOptionalGroupWithTwoCollectionVars: RecordFormSchema = {
  validationTypeId: 'thesisManuscript',
  form: {
    name: 'divaOutput',
    type: 'group',
    presentationId: 'somePGroup',
    mode: 'input',
    tooltip: {
      title: 'thesisManuscriptNewGroupText',
      body: 'thesisManuscriptNewGroupDefText',
    },
    label: 'thesisManuscriptNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'point',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'pointGroupText',
          body: 'pointGroupDefText',
        },
        label: 'pointGroupText',
        headlineLevel: 'h3',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0, // For the test
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'someCollectionVar',
            type: 'numberVariable',
            presentationId: 'somePColVar',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'domainCollectionVarText',
              body: 'domainCollectionVarDefText',
            },
            label: 'someCollectionVarText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            options: [
              {
                value: 'bth',
                label: 'bthItemText',
              },
            ],
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'someOtherCollectionVar',
            type: 'numberVariable',
            presentationId: 'somePColVar',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'domainCollectionVarText',
              body: 'domainCollectionVarDefText',
            },
            label: 'someOtherCollectionVarText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            options: [
              {
                value: 'bth',
                label: 'bthItemText',
              },
            ],
            childStyle: [],
            gridColSpan: 12,
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefWithTextVarAndNestedGroupsWithOneTextVar: RecordFormSchema =
  {
    validationTypeId: 'thesisManuscript',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'thesisManuscriptNewGroupText',
        body: 'thesisManuscriptNewGroupDefText',
      },
      label: 'thesisManuscriptNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'point',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'pointGroupText',
            body: 'pointGroupDefText',
          },
          label: 'pointGroupText',
          headlineLevel: 'h3',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1, // For the test
            repeatMax: 1,
          },
          components: [
            {
              name: 'point',
              type: 'group',
              presentationId: 'somePGroup',
              mode: 'input',
              tooltip: {
                title: 'pointGroupText',
                body: 'pointGroupDefText',
              },
              label: 'pointGroupText',
              headlineLevel: 'h3',
              showLabel: false,
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0, // For the test
                repeatMax: 1,
              },
              components: [
                {
                  name: 'longitude',
                  type: 'numberVariable',
                  presentationId: 'somePNumVar',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'longitudeTextVarText',
                    body: 'longitudeTextVarDefText',
                  },
                  label: 'longitudeTextVarText',
                  showLabel: true,
                  validation: {
                    type: 'number',
                    min: 1,
                    max: 20,
                    warningMin: 2,
                    warningMax: 10,
                    numberOfDecimals: 0,
                  },
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  placeholder: 'someLongitudeTextId',
                  childStyle: ['sixChildStyle'],
                  gridColSpan: 6,
                },
                {
                  name: 'point2',
                  type: 'group',
                  presentationId: 'somePGroup',
                  mode: 'input',
                  tooltip: {
                    title: 'pointGroupText',
                    body: 'pointGroupDefText',
                  },
                  label: 'pointGroupText',
                  headlineLevel: 'h3',
                  showLabel: false,
                  repeat: {
                    minNumberOfRepeatingToShow: 1,
                    repeatMin: 1, // For the test
                    repeatMax: 1,
                  },
                  components: [
                    {
                      name: 'point3',
                      type: 'group',
                      presentationId: 'somePGroup',
                      mode: 'input',
                      tooltip: {
                        title: 'pointGroupText',
                        body: 'pointGroupDefText',
                      },
                      label: 'pointGroupText',
                      headlineLevel: 'h3',
                      showLabel: false,
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 1, // For the test
                        repeatMax: 1,
                      },
                      components: [
                        {
                          name: 'point',
                          type: 'group',
                          presentationId: 'somePGroup',
                          mode: 'input',
                          tooltip: {
                            title: 'pointGroupText',
                            body: 'pointGroupDefText',
                          },
                          label: 'pointGroupText',
                          headlineLevel: 'h3',
                          showLabel: false,
                          repeat: {
                            minNumberOfRepeatingToShow: 1,
                            repeatMin: 1, // For the test
                            repeatMax: 1,
                          },
                          components: [
                            {
                              name: 'latitude',
                              type: 'numberVariable',
                              presentationId: 'somePNumVar',
                              mode: 'input',
                              inputType: 'input',
                              tooltip: {
                                title: 'latitudeTextVarText',
                                body: 'latitudeTextVarDefText',
                              },
                              label: 'latitudeTextVarText',
                              showLabel: true,
                              validation: {
                                type: 'number',
                                min: 1,
                                max: 20,
                                warningMin: 2,
                                warningMax: 10,
                                numberOfDecimals: 0,
                              },
                              repeat: {
                                minNumberOfRepeatingToShow: 1,
                                repeatMin: 1,
                                repeatMax: 1,
                              },
                              placeholder: 'someLatitudeTextId',
                              childStyle: ['sixChildStyle'],
                              gridColSpan: 6,
                            },
                          ],
                          presentationStyle: '',
                          childStyle: [],
                          gridColSpan: 12,
                        },
                      ],
                      presentationStyle: '',
                      childStyle: [],
                      gridColSpan: 12,
                    },
                  ],
                  presentationStyle: '',
                  childStyle: [],
                  gridColSpan: 12,
                },
              ],
              presentationStyle: '',
              childStyle: [],
              gridColSpan: 12,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefTitleInfoGroup: RecordFormSchema = {
  validationTypeId: 'preprint',
  form: {
    name: 'divaOutput',
    type: 'group',
    presentationId: 'somePGroup',
    mode: 'input',
    tooltip: {
      title: 'preprintNewGroupText',
      body: 'preprintNewGroupDefText',
    },
    label: 'preprintNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'titleInfo',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'titleInfoGroupText',
          body: 'titleInfoGroupDefText',
        },
        label: 'titleInfoGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        attributes: [
          {
            name: 'lang',
            type: 'numberVariable',
            presentationId: 'somePColVar',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'languageCollectionVarText',
              body: 'languageCollectionVarDefText',
            },
            label: 'languageCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'eng',
                label: 'engLangItemText',
              },
              {
                value: 'swe',
                label: 'sweLangItemText',
              },
            ],
          },
        ],
        components: [
          {
            name: 'title',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'titleTextVarText',
              body: 'titleTextVarDefText',
            },
            label: 'titleTextVarText',
            placeholder: 'titleInfoVarText1',
            showLabel: true,
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
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
      {
        name: 'titleInfo',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'titleInfoGroupText',
          body: 'titleInfoGroupDefText',
        },
        label: 'titleInfoGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        attributes: [
          {
            name: 'lang',
            type: 'numberVariable',
            presentationId: 'somePColVar',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'languageCollectionVarText',
              body: 'languageCollectionVarDefText',
            },
            label: 'languageCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'eng',
                label: 'engLangItemText',
              },
              {
                value: 'swe',
                label: 'sweLangItemText',
              },
            ],
          },
          {
            name: 'type',
            type: 'numberVariable',
            presentationId: 'somePColVar',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'titleTypeCollectionVarText',
              body: 'titleTypeCollectionVarDefText',
            },
            label: 'titleTypeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'alternative',
                label: 'alternativeTitleItemText',
              },
            ],
            finalValue: 'alternative',
          },
        ],
        components: [
          {
            name: 'title',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'titleTextVarText',
              body: 'titleTextVarDefText',
            },
            label: 'titleTextVarText',
            placeholder: 'titleInfoVarText2',
            showLabel: true,
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
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefContributorGroupWithAuthorGroupAuthor: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    name: 'contributor',
    type: 'group',
    presentationId: 'somePGroup',
    mode: 'input',
    tooltip: {
      title: 'contributorGroupText',
      body: 'contributorGroupDefText',
    },
    label: 'contributorGroupText',
    showLabel: true,
    repeat: {
      minNumberOfRepeatingToShow: 1,
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'author',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'authorGroupText',
        headlineLevel: 'h3',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'divaPerson',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'divaPersonLinkText',
              body: 'divaPersonLinkDefText',
            },
            label: 'divaPersonLinkText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            recordLinkType: 'person',
            presentationRecordLinkId: 'divaPersonPLink',
            search: 'personSearch',
          },
          {
            name: 'givenName',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'givenNameTextVarText',
              body: 'givenNameTextVarDefText',
            },
            label: 'givenNameTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: ['eightChildStyle'],
            gridColSpan: 8,
          },
          {
            name: 'correspondingAuthor',
            type: 'numberVariable',
            presentationId: 'somePColVar',
            placeholder: 'initialEmptyValueText',
            mode: 'input',
            tooltip: {
              title: 'correspondingAuthorCollectionVarText',
              body: 'correspondingAuthorCollectionVarDefText',
            },
            label: 'correspondingAuthorCollectionVarText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            options: [
              {
                value: 'divaYes',
                label: 'divaYesItemText',
              },
              {
                value: 'divaNo',
                label: 'divaNoItemText',
              },
            ],
            childStyle: ['fourChildStyle'],
            gridColSpan: 4,
          },
          {
            name: 'familyName',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'familyNameTextVarText',
              body: 'familyNameTextVarDefText',
            },
            label: 'familyNameTextVarText',
            showLabel: true,
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
          },
          {
            name: 'email',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'contributorEmailTextVarText',
              body: 'contributorEmailTextVarDefText',
            },
            label: 'contributorEmailTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'birthYear',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'birthYearTextVarText',
              body: 'birthYearTextVarDefText',
            },
            label: 'birthYearTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '^[0-9]{4}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'deathYear',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'deathYearTextVarText',
              body: 'deathYearTextVarDefText',
            },
            label: 'deathYearTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '^[0-9]{4}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'localUserId',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'localUserIdTextVarText',
              body: 'localUserIdTextVarDefText',
            },
            label: 'localUserIdTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'ORCID',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'orcidTextVarText',
              body: 'orcidTextVarDefText',
            },
            label: 'orcidTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '^(\\d{4})-(\\d{4})-(\\d{4})-(\\d{3}[0-9X])$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'organisation',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'organisationLinkText',
              body: 'organisationLinkDefText',
            },
            label: 'organisationLinkText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            recordLinkType: 'organisation',
            presentationRecordLinkId: 'organisationPLink',
            search: 'organisationSearch',
          },
          {
            name: 'otherOrganisation',
            type: 'group',
            presentationId: 'somePGroup',
            mode: 'input',
            tooltip: {
              title: 'otherOrganisationGroupText',
              body: 'otherOrganisationGroupDefText',
            },
            label: 'otherOrganisationGroupText',
            showLabel: false,
            repeat: {
              minNumberOfRepeatingToShow: 0,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            components: [
              {
                name: 'otherOrganisation',
                type: 'numberVariable',
                presentationId: 'somePTextVar',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'otherOrganisationTextVarText',
                  body: 'otherOrganisationTextVarDefText',
                },
                label: 'otherOrganisationTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: [],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'researchGroup',
            type: 'recordLink',
            mode: 'input',
            tooltip: {
              title: 'researchGroupLinkText',
              body: 'researchGroupLinkDefText',
            },
            label: 'researchGroupLinkText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            childStyle: [],
            gridColSpan: 12,
            recordLinkType: 'researchGroup',
            presentationRecordLinkId: 'researchGroupPLink',
            search: 'researchGroupSearch',
          },
          {
            name: 'otherResearchGroup',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'otherResearchGroupTextVarText',
              body: 'otherResearchGroupTextVarDefText',
            },
            label: 'otherResearchGroupTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 0,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefPreprintWithOnlyAuthorName: RecordFormSchema = {
  validationTypeId: 'preprint',
  form: {
    name: 'divaOutput',
    type: 'group',
    presentationId: 'somePGroup',
    mode: 'output',
    tooltip: {
      title: 'divaOutputGroupText',
      body: 'divaOutputGroupDefText',
    },
    label: 'divaOutputGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'author',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'output',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'authorGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'givenName',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'givenNameTextVarText',
              body: 'givenNameTextVarDefText',
            },
            label: 'givenNameTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'familyName',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'familyNameTextVarText',
              body: 'familyNameTextVarDefText',
            },
            label: 'familyNameTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefNatSubGroupRequiredAndRecordLinksSameNameInDataWithAttributes: RecordFormSchema =
  {
    validationTypeId: 'preprint',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'preprintNewGroupText',
        body: 'preprintNewGroupDefText',
      },
      label: 'preprintNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'nationalSubjectCategory',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'nationalSubjectCategoryLinkText',
            body: 'nationalSubjectCategoryLinkDefText',
          },
          label: 'nationalSubjectCategoryLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          recordLinkType: 'nationalSubjectCategory',
          presentationRecordLinkId: 'nationalSubjectCategoryPLink',
          search: 'nationalSubjectCategorySearch',
          attributes: [
            {
              name: 'language',
              type: 'numberVariable',
              presentationId: 'somePColVar',
              placeholder: 'initialEmptyValueText',
              mode: 'input',
              tooltip: {
                title: 'languageCollectionVarText',
                body: 'languageCollectionVarDefText',
              },
              label: 'languageCollectionVarText',
              showLabel: true,
              options: [
                {
                  value: 'swe',
                  label: 'sweLangItemText',
                },
                {
                  value: 'eng',
                  label: 'engLangItemText',
                },
              ],
              finalValue: 'swe',
            },
          ],
        },
        {
          name: 'nationalSubjectCategory',
          type: 'recordLink',
          mode: 'input',
          tooltip: {
            title: 'nationalSubjectCategoryLinkText',
            body: 'nationalSubjectCategoryLinkDefText',
          },
          label: 'nationalSubjectCategoryLinkText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          recordLinkType: 'nationalSubjectCategory',
          presentationRecordLinkId: 'nationalSubjectCategoryPLink',
          search: 'nationalSubjectCategorySearch',
          attributes: [
            {
              name: 'language',
              type: 'numberVariable',
              presentationId: 'somePColVar',
              placeholder: 'initialEmptyValueText',
              mode: 'input',
              tooltip: {
                title: 'languageCollectionVarText',
                body: 'languageCollectionVarDefText',
              },
              label: 'languageCollectionVarText',
              showLabel: true,
              options: [
                {
                  value: 'swe',
                  label: 'sweLangItemText',
                },
                {
                  value: 'eng',
                  label: 'engLangItemText',
                },
              ],
              finalValue: 'eng',
            },
          ],
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefSubjectGroupOptionalWithAttributesAndTopicWithAttributes: RecordFormSchema =
  {
    validationTypeId: 'preprint',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'preprintNewGroupText',
        body: 'preprintNewGroupDefText',
      },
      label: 'preprintNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'subject',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'keywordsGroupText',
            body: 'keywordsGroupDefText',
          },
          label: 'keywordsGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1.7976931348623157e308,
          },
          attributes: [
            {
              name: 'lang',
              type: 'numberVariable',
              presentationId: 'somePColVar',
              placeholder: 'initialEmptyValueText',
              mode: 'input',
              tooltip: {
                title: 'languageCollectionVarText',
                body: 'languageCollectionVarDefText',
              },
              label: 'languageCollectionVarText',
              showLabel: true,
              options: [
                {
                  value: 'eng',
                  label: 'engLangItemText',
                },
                {
                  value: 'swe',
                  label: 'sweLangItemText',
                },
              ],
            },
          ],
          components: [
            {
              name: 'topic',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'keywordsTextVarText',
                body: 'keywordsTextVarDefText',
              },
              label: 'keywordsTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1.7976931348623157e308,
              },
              attributes: [
                {
                  name: 'lang',
                  type: 'numberVariable',
                  presentationId: 'somePColVar',
                  placeholder: 'initialEmptyValueText',
                  mode: 'input',
                  tooltip: {
                    title: 'languageCollectionVarText',
                    body: 'languageCollectionVarDefText',
                  },
                  label: 'languageCollectionVarText',
                  showLabel: true,
                  options: [
                    {
                      value: 'eng',
                      label: 'engLangItemText',
                    },
                    {
                      value: 'swe',
                      label: 'sweLangItemText',
                    },
                  ],
                },
              ],
              childStyle: [],
              gridColSpan: 12,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefSubjectGroupRequiredWithAttributesAndTopicWithAttributes: RecordFormSchema =
  {
    validationTypeId: 'preprint',
    form: {
      name: 'divaOutput',
      type: 'group',
      presentationId: 'somePGroup',
      mode: 'input',
      tooltip: {
        title: 'preprintNewGroupText',
        body: 'preprintNewGroupDefText',
      },
      label: 'preprintNewGroupText',
      headlineLevel: 'h1',
      showLabel: true,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'subject',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'keywordsGroupText',
            body: 'keywordsGroupDefText',
          },
          label: 'keywordsGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1.7976931348623157e308,
          },
          attributes: [
            {
              name: 'lang',
              type: 'numberVariable',
              presentationId: 'somePColVar',
              placeholder: 'initialEmptyValueText',
              mode: 'input',
              tooltip: {
                title: 'languageCollectionVarText',
                body: 'languageCollectionVarDefText',
              },
              label: 'languageCollectionVarText',
              showLabel: true,
              options: [
                {
                  value: 'eng',
                  label: 'engLangItemText',
                },
                {
                  value: 'swe',
                  label: 'sweLangItemText',
                },
              ],
            },
          ],
          components: [
            {
              name: 'topic',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'keywordsTextVarText',
                body: 'keywordsTextVarDefText',
              },
              label: 'keywordsTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1.7976931348623157e308,
              },
              attributes: [
                {
                  name: 'lang',
                  type: 'numberVariable',
                  presentationId: 'somePColVar',
                  placeholder: 'initialEmptyValueText',
                  mode: 'input',
                  tooltip: {
                    title: 'languageCollectionVarText',
                    body: 'languageCollectionVarDefText',
                  },
                  label: 'languageCollectionVarText',
                  showLabel: true,
                  options: [
                    {
                      value: 'eng',
                      label: 'engLangItemText',
                    },
                    {
                      value: 'swe',
                      label: 'sweLangItemText',
                    },
                  ],
                },
              ],
              childStyle: [],
              gridColSpan: 12,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      presentationStyle: '',
      childStyle: [],
      gridColSpan: 12,
    },
  };

export const formDefTwoOptionalGroupsWithRequiredTextVars: RecordFormSchema = {
  validationTypeId: 'thesisManuscript',
  form: {
    name: 'divaOutput',
    type: 'group',
    presentationId: 'somePGroup',
    mode: 'input',
    tooltip: {
      title: 'thesisManuscriptNewGroupText',
      body: 'thesisManuscriptNewGroupDefText',
    },
    label: 'thesisManuscriptNewGroupText',
    headlineLevel: 'h1',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'author',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'authorGroupText',
          body: 'authorGroupDefText',
        },
        label: 'authorGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        components: [
          {
            name: 'givenName',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'givenNameTextVarText',
              body: 'givenNameTextVarDefText',
            },
            label: 'givenNameTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
          {
            name: 'familyName',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'familyNameTextVarText',
              body: 'familyNameTextVarDefText',
            },
            label: 'familyNameTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: ['sixChildStyle'],
            gridColSpan: 6,
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
      {
        name: 'geoData',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'geoDataGroupText',
          body: 'geoDataGroupDefText',
        },
        label: 'geoDataGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        components: [
          {
            name: 'longitude',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'divaDescriptionTextVarText',
              body: 'divaDescriptionTextVarDefText',
            },
            label: 'divaDescriptionTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
          {
            name: 'polygon',
            type: 'group',
            presentationId: 'somePGroup',
            mode: 'input',
            tooltip: {
              title: 'polygonGroupText',
              body: 'polygonGroupDefText',
            },
            label: 'polygonGroupText',
            showLabel: false,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            components: [
              {
                name: 'point',
                type: 'group',
                presentationId: 'somePGroup',
                mode: 'input',
                tooltip: {
                  title: 'pointGroupText',
                  body: 'pointGroupDefText',
                },
                label: 'pointGroupText',
                headlineLevel: 'h3',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                components: [
                  {
                    name: 'longitude',
                    placeholder: 'longitude',
                    type: 'numberVariable',
                    presentationId: 'somePTextVar',
                    mode: 'input',
                    inputType: 'input',
                    tooltip: {
                      title: 'longitudeTextVarText',
                      body: 'longitudeTextVarDefText',
                    },
                    label: 'longitudeTextVarText',
                    showLabel: true,
                    validation: {
                      type: 'regex',
                      pattern:
                        '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|180)\\.[0-9]{1,20}$)',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 1,
                      repeatMax: 1,
                    },
                    childStyle: ['sixChildStyle'],
                    gridColSpan: 6,
                  },
                  {
                    name: 'latitude',
                    placeholder: 'latitude',
                    type: 'numberVariable',
                    presentationId: 'somePTextVar',
                    mode: 'input',
                    inputType: 'input',
                    tooltip: {
                      title: 'latitudeTextVarText',
                      body: 'latitudeTextVarDefText',
                    },
                    label: 'latitudeTextVarText',
                    showLabel: true,
                    validation: {
                      type: 'regex',
                      pattern:
                        '(^[-]{0,1}([0-9]|[1-9][0-9]|1[0-7][0-9]|90)\\.[0-9]{1,20}$)',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 1,
                      repeatMax: 1,
                    },
                    childStyle: ['sixChildStyle'],
                    gridColSpan: 6,
                  },
                ],
                presentationStyle: '',
                childStyle: [],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: [],
            gridColSpan: 12,
          },
        ],
        presentationStyle: '',
        childStyle: [],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [],
    gridColSpan: 12,
  },
};

export const formDefTwoOptionalGroupsSameNameInDataWithRequiredTextVars: RecordFormSchema =
  {
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      presentationId: 'somePGroup',
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
          name: 'author',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          attributes: [
            {
              name: 'language',
              type: 'numberVariable',
              presentationId: 'somePColVar',
              placeholder: 'initialEmptyValueText',
              mode: 'input',
              tooltip: {
                title: 'languageCollectionVarText',
                body: 'languageCollectionVarDefText',
              },
              label: 'languageCollectionVarText',
              showLabel: true,
              options: [
                {
                  value: 'nau',
                  label: 'nauLangItemText',
                },
                {
                  value: 'uwu',
                  label: 'uwuLangItemText',
                },
              ],
              finalValue: 'uwu',
            },
          ],
          components: [
            {
              name: 'givenName',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'givenNameTextVarText',
                body: 'givenNameTextVarDefText',
              },
              label: 'givenNameTextVarText',
              placeholder: 'givenNameTextVarText1',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'familyName',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'familyNameTextVarText',
                body: 'familyNameTextVarDefText',
              },
              label: 'familyNameTextVarText',
              placeholder: 'familyNameTextVarText1',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
        {
          name: 'author',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          showLabel: true,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          attributes: [
            {
              name: 'language',
              type: 'numberVariable',
              presentationId: 'somePColVar',
              placeholder: 'initialEmptyValueText',
              mode: 'input',
              tooltip: {
                title: 'languageCollectionVarText',
                body: 'languageCollectionVarDefText',
              },
              label: 'languageCollectionVarText',
              showLabel: true,
              options: [
                {
                  value: 'nau',
                  label: 'nauLangItemText',
                },
                {
                  value: 'uwu',
                  label: 'uwuLangItemText',
                },
              ],
              finalValue: 'nau',
            },
          ],
          components: [
            {
              name: 'givenName',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'givenNameTextVarText',
                body: 'givenNameTextVarDefText',
              },
              label: 'givenNameTextVarText',
              placeholder: 'givenNameTextVarText2',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
            {
              name: 'familyName',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'familyNameTextVarText',
                body: 'familyNameTextVarDefText',
              },
              label: 'familyNameTextVarText',
              placeholder: 'familyNameTextVarText2',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: ['sixChildStyle'],
              gridColSpan: 6,
            },
          ],
          presentationStyle: '',
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      mode: 'input',
    },
  };

export const formDefRealDemo: RecordFormSchema = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    presentationId: 'somePGroup',
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
        name: 'recordInfo',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'numberVariable',
        presentationId: 'somePTextVar',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        presentationId: 'somePNumVar',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
      },
      {
        name: 'firstChildGroup',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            presentationId: 'somePNumVar',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            validation: {
              type: 'number',
              min: 0,
              max: 100,
              warningMin: 10,
              warningMax: 90,
              numberOfDecimals: 2,
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'exampleTextVar',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'exampleMetadataTextVarText',
              body: 'exampleMetadataTextVarDefText',
            },
            label: 'exampleMetadataTextVarText',
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      },
    ],
    mode: 'input',
  },
};

export const formDefRealDemoWithFinalValues: RecordFormSchema = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    presentationId: 'somePGroup',
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
        name: 'recordInfo',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'numberVariable',
        presentationId: 'somePTextVar',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        finalValue: 'someFinalValue',
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        presentationId: 'somePNumVar',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        finalValue: '12',
      },
      {
        name: 'firstChildGroup',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            presentationId: 'somePNumVar',
            finalValue: '55',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            validation: {
              type: 'number',
              min: 0,
              max: 100,
              warningMin: 10,
              warningMax: 90,
              numberOfDecimals: 2,
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'exampleTextVar',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            finalValue: 'someText',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'exampleMetadataTextVarText',
              body: 'exampleMetadataTextVarDefText',
            },
            label: 'exampleMetadataTextVarText',
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      },
    ],
    mode: 'input',
  },
};

export const formDefRealDemoWithAttributesButWithoutFinalValue: RecordFormSchema =
  {
    validationTypeId: 'demo',
    form: {
      type: 'group',
      presentationId: 'somePGroup',
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
      mode: 'input',

      components: [
        {
          name: 'recordInfo',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'recordInfoText',
            body: 'recordInfoDefText',
          },
          label: 'recordInfoText',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
        },
        {
          name: 'bookTitle',
          type: 'numberVariable',
          presentationId: 'somePTextVar',
          mode: 'input',
          inputType: 'input',
          tooltip: {
            title: 'bookTitletextVarText',
            body: 'bookTitletextVarDefText',
          },
          label: 'bookTitletextVarText',
          showLabel: true,
          validation: {
            type: 'regex',
            pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
          },
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          attributes: [
            {
              type: 'numberVariable',
              presentationId: 'somePColVar',
              name: 'colour',
              showLabel: true,
              label: 'colourLabel',
              placeholder: 'emptyTextId',
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
          ],
        },
        {
          name: 'keeptHis',
          type: 'numberVariable',
          presentationId: 'somePNumVar',
          mode: 'input',
          tooltip: {
            title: 'keepThisNumberVarText',
            body: 'keepThisNumberVarDefText',
          },
          label: 'keepThisNumberVarText',
          showLabel: true,
          validation: {
            type: 'number',
            min: 0,
            max: 20,
            warningMin: 2,
            warningMax: 10,
            numberOfDecimals: 0,
          },
          repeat: {
            minNumberOfRepeatingToShow: 2,
            repeatMin: 0,
            repeatMax: 2,
          },
          attributes: [
            {
              type: 'numberVariable',
              presentationId: 'somePColVar',
              showLabel: true,
              label: 'colour',
              name: 'colour',
              placeholder: 'emptyTextId',
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
          ],
        },
        {
          name: 'firstChildGroup',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'exampleFirstChildGroupText',
            body: 'exampleFirstChildGroupDefText',
          },
          label: 'exampleFirstChildGroupText',
          showLabel: true,
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          attributes: [
            {
              type: 'numberVariable',
              presentationId: 'somePColVar',
              name: 'groupColour',
              showLabel: true,
              label: 'groupColourLabel',
              placeholder: 'emptyTextId',
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
            {
              type: 'numberVariable',
              presentationId: 'somePColVar',
              name: 'groupColourAgain',
              placeholder: 'emptyTextId',
              showLabel: true,
              label: 'groupColourAgainLabel',
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
          ],
          components: [
            {
              name: 'exampleNumberVar',
              type: 'numberVariable',
              presentationId: 'somePNumVar',
              mode: 'input',
              tooltip: {
                title: 'exampleMetadataNumberVarText',
                body: 'exampleMetadataNumberVarDefText',
              },
              label: 'exampleMetadataNumberVarText',
              showLabel: true,
              validation: {
                type: 'number',
                min: 0,
                max: 100,
                warningMin: 10,
                warningMax: 90,
                numberOfDecimals: 2,
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
            },
            {
              name: 'exampleTextVar',
              type: 'numberVariable',
              presentationId: 'somePTextVar',
              mode: 'input',
              inputType: 'input',
              tooltip: {
                title: 'exampleMetadataTextVarText',
                body: 'exampleMetadataTextVarDefText',
              },
              label: 'exampleMetadataTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.*',
              },
              repeat: {
                repeatMin: 1,
                repeatMax: 1,
              },
              attributes: [
                {
                  type: 'numberVariable',
                  presentationId: 'somePColVar',
                  name: 'colour',
                  placeholder: 'emptyTextId',
                  showLabel: true,
                  label: 'colourLabel',
                  tooltip: {
                    title: 'exampleCollectionVarText',
                    body: 'exampleCollectionVarDefText',
                  },
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
                {
                  type: 'numberVariable',
                  presentationId: 'somePColVar',
                  name: 'colourAgain',
                  showLabel: true,
                  label: 'groupColourAgainLabel',
                  placeholder: 'emptyTextId',
                  tooltip: {
                    title: 'exampleCollectionVarText',
                    body: 'exampleCollectionVarDefText',
                  },
                  options: [
                    { value: 'blue', label: 'exampleBlueItemText' },
                    { value: 'pink', label: 'examplePinkItemText' },
                    { value: 'yellow', label: 'exampleYellowItemText' },
                  ],
                  mode: 'input',
                },
              ],
            },
          ],
        },
      ],
    },
  };

export const formDefRealDemoWithAttributes: RecordFormSchema = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    presentationId: 'somePGroup',
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
    mode: 'input',

    components: [
      {
        name: 'recordInfo',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'numberVariable',
        presentationId: 'somePTextVar',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        showLabel: true,
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        attributes: [
          {
            type: 'numberVariable',
            presentationId: 'somePColVar',
            name: 'colour',
            showLabel: true,
            label: 'colourLabel',
            placeholder: 'emptyTextId',
            tooltip: {
              title: 'exampleCollectionVarText',
              body: 'exampleCollectionVarDefText',
            },
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' },
            ],
            mode: 'input',
          },
        ],
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        presentationId: 'somePNumVar',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        showLabel: true,
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        attributes: [
          {
            type: 'numberVariable',
            presentationId: 'somePColVar',
            name: 'colour',
            showLabel: true,
            label: 'colourLabel',
            placeholder: 'emptyTextId',
            tooltip: {
              title: 'exampleCollectionVarText',
              body: 'exampleCollectionVarDefText',
            },
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' },
            ],
            mode: 'input',
          },
        ],
      },
      {
        name: 'firstChildGroup',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        showLabel: true,
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        attributes: [
          {
            type: 'numberVariable',
            presentationId: 'somePColVar',
            name: 'groupColour',
            placeholder: 'emptyTextId',
            showLabel: true,
            label: 'groupColourLabel',
            tooltip: {
              title: 'exampleCollectionVarText',
              body: 'exampleCollectionVarDefText',
            },
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' },
            ],
            mode: 'input',
          },
          {
            type: 'numberVariable',
            presentationId: 'somePColVar',
            name: 'groupColourAgain',
            showLabel: true,
            label: 'groupColourAgainLabel',
            finalValue: 'pink',
            placeholder: 'emptyTextId',
            tooltip: {
              title: 'exampleCollectionVarText',
              body: 'exampleCollectionVarDefText',
            },
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' },
            ],
            mode: 'input',
          },
        ],
        components: [
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            presentationId: 'somePNumVar',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            showLabel: true,
            validation: {
              type: 'number',
              min: 0,
              max: 100,
              warningMin: 10,
              warningMax: 90,
              numberOfDecimals: 2,
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'exampleTextVar',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            finalValue: 'exampleFinalValue',
            tooltip: {
              title: 'exampleMetadataTextVarText',
              body: 'exampleMetadataTextVarDefText',
            },
            label: 'exampleMetadataTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            attributes: [
              {
                type: 'numberVariable',
                presentationId: 'somePColVar',
                name: 'colour',
                placeholder: 'emptyTextId',
                showLabel: true,
                label: 'colourLabel',
                tooltip: {
                  title: 'exampleCollectionVarText',
                  body: 'exampleCollectionVarDefText',
                },
                options: [
                  { value: 'blue', label: 'exampleBlueItemText' },
                  { value: 'pink', label: 'examplePinkItemText' },
                  { value: 'yellow', label: 'exampleYellowItemText' },
                ],
                mode: 'input',
              },
              {
                type: 'numberVariable',
                presentationId: 'somePColVar',
                name: 'colourAgain',
                finalValue: 'pink',
                placeholder: 'emptyTextId',
                showLabel: true,
                label: 'colourAgainLabel',
                tooltip: {
                  title: 'exampleCollectionVarText',
                  body: 'exampleCollectionVarDefText',
                },
                options: [
                  { value: 'blue', label: 'exampleBlueItemText' },
                  { value: 'pink', label: 'examplePinkItemText' },
                  { value: 'yellow', label: 'exampleYellowItemText' },
                ],
                mode: 'input',
              },
            ],
          },
        ],
      },
    ],
  },
};

export const formDefRealDemoWithRepeatingVars: RecordFormSchema = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    presentationId: 'somePGroup',
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
    mode: 'input',
    components: [
      {
        name: 'recordInfo',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'numberVariable',
        presentationId: 'somePTextVar',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        presentationId: 'somePNumVar',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        showLabel: true,
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 5,
          repeatMin: 0,
          repeatMax: 5,
        },
        attributes: [
          {
            type: 'numberVariable',
            presentationId: 'somePColVar',
            name: 'colour',
            placeholder: 'emptyTextId',
            finalValue: 'blue',
            label: 'colourLabel',
            showLabel: true,
            tooltip: {
              title: 'exampleCollectionVarText',
              body: 'exampleCollectionVarDefText',
            },
            options: [
              { value: 'blue', label: 'exampleBlueItemText' },
              { value: 'pink', label: 'examplePinkItemText' },
              { value: 'yellow', label: 'exampleYellowItemText' },
            ],
            mode: 'input',
          },
        ],
      },
      {
        name: 'firstChildGroup',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        showLabel: true,
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            presentationId: 'somePNumVar',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            showLabel: true,
            validation: {
              type: 'number',
              min: 0,
              max: 100,
              warningMin: 10,
              warningMax: 90,
              numberOfDecimals: 2,
            },
            repeat: {
              minNumberOfRepeatingToShow: 5,
              repeatMin: 1,
              repeatMax: 5,
            },
            attributes: [
              {
                type: 'numberVariable',
                presentationId: 'somePColVar',
                name: 'colour',
                placeholder: 'emptyTextId',
                finalValue: 'pink',
                showLabel: true,
                label: 'colourLabel',
                tooltip: {
                  title: 'exampleCollectionVarText',
                  body: 'exampleCollectionVarDefText',
                },
                options: [
                  { value: 'blue', label: 'exampleBlueItemText' },
                  { value: 'pink', label: 'examplePinkItemText' },
                  { value: 'yellow', label: 'exampleYellowItemText' },
                ],
                mode: 'input',
              },
            ],
          },
          {
            name: 'exampleTextVar',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'exampleMetadataTextVarText',
              body: 'exampleMetadataTextVarDefText',
            },
            label: 'exampleMetadataTextVarText',
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 0,
              repeatMax: 2,
            },
          },
        ],
      },
    ],
  },
};

export const formDefRealDemoWithRepeatingGroups: RecordFormSchema = {
  validationTypeId: 'demo',
  form: {
    type: 'group',
    presentationId: 'somePGroup',
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
    mode: 'input',

    components: [
      {
        name: 'recordInfo',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'recordInfoText',
          body: 'recordInfoDefText',
        },
        label: 'recordInfoText',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'bookTitle',
        type: 'numberVariable',
        presentationId: 'somePTextVar',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'bookTitletextVarText',
          body: 'bookTitletextVarDefText',
        },
        label: 'bookTitletextVarText',
        validation: {
          type: 'regex',
          pattern: '(^[0-9A-ZÅÄÖ a-zåäö:-_]{2,50}$)',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'keeptHis',
        type: 'numberVariable',
        presentationId: 'somePNumVar',
        mode: 'input',
        tooltip: {
          title: 'keepThisNumberVarText',
          body: 'keepThisNumberVarDefText',
        },
        label: 'keepThisNumberVarText',
        validation: {
          type: 'number',
          min: 0,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
      },
      {
        name: 'firstChildGroup',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          minNumberOfRepeatingToShow: 2,
          repeatMin: 0,
          repeatMax: 2,
        },
        components: [
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            presentationId: 'somePNumVar',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            validation: {
              type: 'number',
              min: 0,
              max: 100,
              warningMin: 10,
              warningMax: 90,
              numberOfDecimals: 2,
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'exampleTextVar',
            type: 'numberVariable',
            presentationId: 'somePTextVar',
            mode: 'input',
            inputType: 'input',
            tooltip: {
              title: 'exampleMetadataTextVarText',
              body: 'exampleMetadataTextVarDefText',
            },
            label: 'exampleMetadataTextVarText',
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      },
    ],
  },
};

export const formDefWithRepeatingGroup: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    presentationId: 'somePGroup',
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
    mode: 'input',

    components: [
      {
        name: 'firstChildGroup',
        type: 'group',
        presentationId: 'somePGroup',
        mode: 'input',
        tooltip: {
          title: 'exampleFirstChildGroupText',
          body: 'exampleFirstChildGroupDefText',
        },
        label: 'exampleFirstChildGroupText',
        repeat: {
          minNumberOfRepeatingToShow: 0,
          repeatMin: 0,
          repeatMax: 10,
        },
        components: [
          {
            type: 'text',
            presentationId: 'somePText',
            name: 'presentationTypeTextCollectionVarDefText',
          },
          {
            name: 'exampleNumberVar',
            type: 'numberVariable',
            presentationId: 'somePNumVar',
            mode: 'input',
            tooltip: {
              title: 'exampleMetadataNumberVarText',
              body: 'exampleMetadataNumberVarDefText',
            },
            label: 'exampleMetadataNumberVarText',
            validation: {
              type: 'number',
              min: 0,
              max: 20,
              warningMin: 10,
              warningMax: 90,
              numberOfDecimals: 2,
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      },
    ],
  },
};

export const formDefWithRepeatingGroupWithRepeatingChildGroup: RecordFormSchema =
  {
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      presentationId: 'somePGroup',
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
      mode: 'input',
      components: [
        {
          name: 'author',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 10,
          },
          components: [
            {
              name: 'name',
              type: 'group',
              presentationId: 'somePGroup',
              mode: 'input',
              tooltip: {
                title: 'exampleFirstChildGroupText',
                body: 'exampleFirstChildGroupDefText',
              },
              label: 'exampleFirstChildGroupText',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 100,
              },
              components: [
                {
                  name: 'shouldBeSkippedComponent',
                  type: 'text',
                  presentationId: 'somePText',
                },
                {
                  name: 'firstName',
                  type: 'numberVariable',
                  presentationId: 'somePTextVar',
                  mode: 'input',
                  tooltip: {
                    title: 'exampleMetadataVarText',
                    body: 'exampleMetadataVarDefText',
                  },
                  label: 'firstName',
                  validation: {
                    type: 'regex',
                    pattern: '^[a-zA-Z]$',
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  name: 'lastName',
                  type: 'numberVariable',
                  presentationId: 'somePTextVar',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'exampleMetadataTextVarText',
                    body: 'exampleMetadataTextVarDefText',
                  },
                  label: 'exampleMetadataTextVarText',
                  validation: {
                    type: 'regex',
                    pattern: '^[a-zA-Z]$',
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  type: 'numberVariable',
                  presentationId: 'somePNumVar',
                  name: 'age',
                  placeholder: 'someNumberPlaceholderTextId',
                  validation: {
                    type: 'number',
                    min: 0,
                    max: 125,
                    warningMin: 50,
                    warningMax: 100,
                    numberOfDecimals: 0,
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  };

export const formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes: RecordFormSchema =
  {
    validationTypeId: 'someValidationTypeId',
    form: {
      type: 'group',
      presentationId: 'somePGroup',
      showLabel: false,
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
      mode: 'input',
      components: [
        {
          name: 'author',
          type: 'group',
          presentationId: 'somePGroup',
          mode: 'input',
          tooltip: {
            title: 'authorGroupText',
            body: 'authorGroupDefText',
          },
          label: 'authorGroupText',
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 10,
          },
          attributes: [
            {
              type: 'numberVariable',
              presentationId: 'somePColVar',
              name: 'colourAttribute',
              placeholder: 'emptyTextId',
              showLabel: true,
              label: 'colourAttribute',
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
          ],
          components: [
            {
              name: 'name',
              type: 'group',
              presentationId: 'somePGroup',
              mode: 'input',
              tooltip: {
                title: 'exampleFirstChildGroupText2',
                body: 'exampleFirstChildGroupDefText2',
              },
              label: 'exampleFirstChildGroupText',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 100,
              },
              components: [
                {
                  name: 'shouldBeSkippedComponent12',
                  type: 'text',
                  presentationId: 'somePText',
                },
                {
                  name: 'firstName',
                  type: 'numberVariable',
                  presentationId: 'somePTextVar',
                  mode: 'input',
                  tooltip: {
                    title: 'exampleMetadataVarText',
                    body: 'exampleMetadataVarDefText',
                  },
                  label: 'firstName',
                  validation: {
                    type: 'regex',
                    pattern: '^[a-zA-Z]$',
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                  attributes: [
                    {
                      type: 'numberVariable',
                      presentationId: 'somePColVar',
                      name: 'colourAttribute',
                      placeholder: 'emptyTextId',
                      label: 'colourAttribute',
                      showLabel: true,
                      tooltip: {
                        title: 'exampleCollectionVarText',
                        body: 'exampleCollectionVarDefText',
                      },
                      options: [
                        { value: 'blue', label: 'exampleBlueItemText' },
                        { value: 'pink', label: 'examplePinkItemText' },
                        { value: 'yellow', label: 'exampleYellowItemText' },
                      ],
                      mode: 'input',
                    },
                  ],
                },
                {
                  name: 'lastName',
                  type: 'numberVariable',
                  presentationId: 'somePTextVar',
                  mode: 'input',
                  inputType: 'input',
                  tooltip: {
                    title: 'exampleMetadataTextVarText',
                    body: 'exampleMetadataTextVarDefText',
                  },
                  label: 'exampleMetadataTextVarText',
                  validation: {
                    type: 'regex',
                    pattern: '^[a-zA-Z]$',
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
                {
                  type: 'numberVariable',
                  presentationId: 'somePNumVar',
                  name: 'age',
                  placeholder: 'someNumberPlaceholderTextId',
                  validation: {
                    type: 'number',
                    min: 0,
                    max: 125,
                    warningMin: 50,
                    warningMax: 100,
                    numberOfDecimals: 0,
                  },
                  repeat: {
                    repeatMin: 1,
                    repeatMax: 1,
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'group',
          label: 'someChildGroupTextId',
          showLabel: true,
          name: 'nonRepeatingGroup',
          presentationId: 'somePGroup',
          repeat: {
            repeatMin: 1,
            repeatMax: 1,
          },
          tooltip: {
            title: 'someChildGroupTextId',
            body: 'someChildGroupDefTextId',
          },
          attributes: [
            {
              presentationId: 'somePTextVar',
              type: 'collectionVariable',
              name: 'groupAttribute',
              showLabel: true,
              label: 'groupAttrLabel',
              placeholder: 'emptyTextId',
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'blue', label: 'exampleBlueItemText' },
                { value: 'pink', label: 'examplePinkItemText' },
                { value: 'yellow', label: 'exampleYellowItemText' },
              ],
              mode: 'input',
            },
          ],
          components: [],
          mode: 'input',
        },
        {
          type: 'numberVariable',
          presentationId: 'somePNumVar',
          name: 'grade',
          placeholder: 'yourGrades',
          showLabel: true,
          label: 'gradeLabel',
          validation: {
            type: 'number',
            min: 1,
            max: 5,
            warningMin: 2,
            warningMax: 4,
            numberOfDecimals: 0,
          },
          attributes: [
            {
              presentationId: 'somePTextVar',
              type: 'collectionVariable',
              name: 'gradeAttribute',
              showLabel: true,
              label: 'gradeAttributeLabel',
              placeholder: 'emptyTextId',
              tooltip: {
                title: 'exampleCollectionVarText',
                body: 'exampleCollectionVarDefText',
              },
              options: [
                { value: 'strong', label: 'someStrongLabelText' },
                { value: 'weak', label: 'someWeakLabelText' },
              ],
              mode: 'input',
            },
          ],
          repeat: {
            repeatMin: 1,
            repeatMax: 12,
          },
        },
      ],
    },
  };

export const formDefForCheckTextValue: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    label: 'someRootFormGroupText',
    showLabel: true,
    name: 'someRootNameInData',
    presentationId: 'somePGroup',
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
      minNumberOfRepeatingToShow: 1,
    },
    tooltip: {
      title: 'textId345',
      body: 'defTextId678',
    },
    components: [
      {
        name: 'someTextVar',
        presentationId: 'somePTextVar',
        type: 'textVariable',
        mode: 'output',
        inputType: 'input',
        showLabel: true,
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataTextVarText',
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
      },
      {
        name: 'someOtherTextVar',
        presentationId: 'somePTextVar',
        type: 'textVariable',
        mode: 'output',
        showLabel: true,
        inputType: 'input',
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someOtherMetadataTextVarText',
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
          minNumberOfRepeatingToShow: 1,
        },
      },
    ],
    mode: 'output',
  },
};

export const formDefForCheckNumberValue: RecordFormSchema = {
  validationTypeId: 'someValidationTypeId',
  form: {
    type: 'group',
    showLabel: true,
    label: 'someRootFormGroupText',
    name: 'someRootNameInData',
    presentationId: 'somePGroup',
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
        name: 'someTextVar',
        presentationId: 'somePTextVar',
        type: 'textVariable',
        mode: 'output',
        inputType: 'input',
        showLabel: true,
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataTextVarText',
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'someNumberVar',
        presentationId: 'somePNumberVar',
        type: 'numberVariable',
        mode: 'output',
        inputType: 'input',
        showLabel: true,
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataNumberVarText',
        validation: {
          type: 'number',
          min: 1,
          max: 20,
          warningMin: 2,
          warningMax: 10,
          numberOfDecimals: 0,
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
    ],
    mode: 'output',
  },
};
