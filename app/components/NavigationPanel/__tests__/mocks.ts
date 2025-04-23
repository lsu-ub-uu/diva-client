/*
 * Copyright 2024 Uppsala University Library
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

import type { BFFDataRecord } from '@/types/record';
import type { RecordFormSchema } from '@/components/FormGenerator/types';

export const coraRecord: BFFDataRecord = {
  id: 'divaOutput:519333261463755',
  recordType: 'divaOutput',
  validationType: 'someValidationTypeId',
  createdAt: '2023-10-11T09:24:30.511487Z',
  createdBy: 'coraUser:490742519075086',
  userRights: ['read', 'update', 'index', 'delete'],
  actionLinks: {
    read: {
      url: '',
      rel: 'read',
      requestMethod: 'GET',
    },
  },
  updated: [],
  data: {
    someRootNameInData: {
      recordInfo: {
        id: {
          value: '12345',
        },
        validationType: {
          value: 'record',
        },
        dataDivider: {
          value: 'divaData',
        },
        type: {
          value: 'record',
        },
        createdBy: {
          value: '161616',
        },
        tsCreated: {
          value: '2024-10-16T12:36:04.249992Z',
        },
        updated: [
          {
            tsUpdated: {
              value: '2024-10-16T12:36:04.249992Z',
            },
            updatedBy: {
              value: '161616',
            },
          },
        ],
      },
      someTextVar: {
        value: 'someTestText',
      },
    },
  },
};

export const coraRecord2 = {
  id: 'divaOutput:519333261463755',
  recordType: 'divaOutput',
  validationType: 'someValidationTypeId',
  createdAt: '2023-10-11T09:24:30.511487Z',
  createdBy: 'coraUser:490742519075086',
  userRights: ['read', 'update', 'index', 'delete'],
  updated: [],
  data: {
    someRootNameInData: {
      someTextVar: {
        value: 'someTestText',
      },
      someOtherTextVar: {
        value: 'someOtherTestText',
      },
    },
  },
};

export const coraRecord3 = {
  id: 'divaOutput:9164016293163097',
  recordType: 'divaOutput',
  validationType: 'preprint',
  createdAt: '2024-08-14T12:47:34.685401Z',
  createdBy: '161616',
  updated: [
    {
      updateAt: '2024-08-14T12:47:34.685401Z',
      updatedBy: '161616',
    },
  ],
  userRights: ['read', 'update', 'index', 'delete'],
  data: {
    divaOutput: {
      author: [
        {
          givenName: {
            value: 'Egil',
          },
          familyName: {
            value: 'Swenning',
          },
        },
      ],
      title: {
        mainTitle: {
          value: 'aaaaa',
        },
        _language: 'ady',
      },
      outputType: {
        outputType: {
          value: 'publication',
        },
      },
      domain: {
        value: 'du',
      },
    },
  },
};

export const authorAndTitleSchema: RecordFormSchema = {
  validationTypeId: 'preprint',
  form: {
    name: 'divaOutput',
    presentationId: 'divaOutputGroup',
    type: 'group',
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
        presentationId: 'group',
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
            type: 'textVariable',
            mode: 'output',
            presentationId: 'givenName',
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
            presentationId: 'familyName',
            type: 'textVariable',
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
          {
            name: 'birthYear',
            presentationId: 'somePTextVar',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'birthYearTextVarText',
              body: 'birthYearTextVarDefText',
            },
            label: 'birthYearTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '(^[0-9]{4,4}$)',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
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

export const authorRecord: BFFDataRecord = {
  id: 'divaOutput:9164778159149964',
  recordType: 'divaOutput',
  validationType: 'preprint',
  createdAt: '2024-08-14T13:00:16.551390Z',
  createdBy: '161616',
  updated: [
    {
      updateAt: '2024-08-14T13:00:16.551390Z',
      updatedBy: '161616',
    },
  ],
  userRights: ['read', 'update', 'index', 'delete'],
  actionLinks: {
    read: {
      url: '',
      rel: 'read',
      requestMethod: 'GET',
    },
  },
  data: {
    divaOutput: {
      recordInfo: {
        id: {
          value: '12345',
        },
        validationType: {
          value: 'author',
        },
        dataDivider: {
          value: 'divaData',
        },
        type: {
          value: 'author',
        },
        createdBy: {
          value: '161616',
        },
        tsCreated: {
          value: '2024-10-16T12:36:04.249992Z',
        },
        updated: [
          {
            tsUpdated: {
              value: '2024-10-16T12:36:04.249992Z',
            },
            updatedBy: {
              value: '161616',
            },
          },
        ],
      },
      author: [
        {
          givenName: {
            value: 'E',
          },
          familyName: {
            value: 'S',
          },
        },
      ],
    },
  },
};
