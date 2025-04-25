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

import type { BFFDataRecord } from '@/types/record';
import type { RecordFormSchema } from '@/components/FormGenerator/types';

export const linkedBinaryMock = {
  id: 'binary:1283806137807105',
  recordType: 'binary',
  validationType: 'genericBinary',
  createdAt: '2025-02-20T09:14:33.254779Z',
  createdBy: '161616',
  updated: [
    {
      updateAt: '2025-02-20T09:14:41.144373Z',
      updatedBy: '141414',
    },
  ],
  actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
  userRights: ['read'],
  data: {
    binary: {
      recordInfo: {
        dataDivider: {
          value: 'divaData',
        },
        validationType: {
          value: 'genericBinary',
        },
        id: {
          value: 'binary:1283806137807105',
        },
        type: {
          value: 'binary',
        },
        createdBy: {
          value: '161616',
        },
        tsCreated: {
          value: '2025-02-20T09:14:33.254779Z',
        },
        updated: [
          {
            tsUpdated: {
              value: '2025-02-20T09:14:33.254779Z',
            },
            updatedBy: {
              value: '161616',
            },
          },
        ],
      },
      adminInfo: {
        visibility: {
          value: 'unpublished',
        },
        tsVisibility: [
          {
            value: '2025-02-20T09:14:33.254653Z',
          },
        ],
      },
      master: [
        {
          resourceId: {
            value: 'binary:1283806137807105-master',
          },
          master: {
            name: 'master',
            mimeType: 'image/jpeg',
            actionLinks: {
              read: {
                requestMethod: 'GET',
                rel: 'read',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/binary/binary:1283806137807105/master',
                accept: 'image/jpeg',
              },
            },
          },
          fileSize: {
            value: '12648',
          },
          mimeType: {
            value: 'image/jpeg',
          },
          checksum: [
            {
              value:
                '6722a33db068eae235f8d6a0748e3213597ff2243da5d9b913eef46f3ec3ddf6897f8bcec61eb94a7cd3f7b21f9a0f2b1995238157263c1b46b02b784f1da005',
            },
          ],
          checksumType: [
            {
              value: 'SHA-512',
            },
          ],
          originalFileName: {
            value: 'cat.jpg',
          },
          height: [
            {
              value: '312',
            },
          ],
          width: [
            {
              value: '312',
            },
          ],
          resolution: [
            {
              value: '72x72',
            },
          ],
        },
      ],
      large: [
        {
          resourceId: {
            value: 'binary:1283806137807105-large',
          },
          large: {
            name: 'large',
            mimeType: 'image/jpeg',
            actionLinks: {
              read: {
                requestMethod: 'GET',
                rel: 'read',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/binary/binary:1283806137807105/large',
                accept: 'image/jpeg',
              },
            },
          },
          fileSize: {
            value: '75541',
          },
          mimeType: {
            value: 'image/jpeg',
          },
          height: {
            value: '600',
          },
          width: {
            value: '600',
          },
        },
      ],
      medium: [
        {
          resourceId: {
            value: 'binary:1283806137807105-medium',
          },
          medium: {
            name: 'medium',
            mimeType: 'image/jpeg',
            actionLinks: {
              read: {
                requestMethod: 'GET',
                rel: 'read',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/binary/binary:1283806137807105/medium',
                accept: 'image/jpeg',
              },
            },
          },
          fileSize: {
            value: '27689',
          },
          mimeType: {
            value: 'image/jpeg',
          },
          height: {
            value: '300',
          },
          width: {
            value: '300',
          },
        },
      ],
      thumbnail: [
        {
          resourceId: {
            value: 'binary:1283806137807105-thumbnail',
          },
          thumbnail: {
            name: 'thumbnail',
            mimeType: 'image/jpeg',
            actionLinks: {
              read: {
                requestMethod: 'GET',
                rel: 'read',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/binary/binary:1283806137807105/thumbnail',
                accept: 'image/jpeg',
              },
            },
          },
          fileSize: {
            value: '4522',
          },
          mimeType: {
            value: 'image/jpeg',
          },
          height: {
            value: '100',
          },
          width: {
            value: '100',
          },
        },
      ],
      jp2: [
        {
          resourceId: {
            value: 'binary:1283806137807105-jp2',
          },
          jp2: {
            name: 'jp2',
            mimeType: 'image/jp2',
            actionLinks: {
              read: {
                requestMethod: 'GET',
                rel: 'read',
                url: 'https://cora.epc.ub.uu.se/diva/rest/record/binary/binary:1283806137807105/jp2',
                accept: 'image/jp2',
              },
            },
          },
          fileSize: {
            value: '81289',
          },
          mimeType: {
            value: 'image/jp2',
          },
          height: {
            value: '312',
          },
          width: {
            value: '312',
          },
        },
      ],
    },
  },
  presentation: {
    form: {
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      childStyle: [],
      gridColSpan: 12,
      name: 'binary',
      presentationId: 'binaryGroup',
      type: 'group',
      mode: 'output',
      tooltip: {
        title: 'binaryGroupText',
        body: 'binaryGroupDefText',
      },
      label: 'binaryGroupText',
      showLabel: true,
      presentationStyle: '',
      attributes: [
        {
          name: 'type',
          presentationId: 'presentationIdForType',
          type: 'collectionVariable',
          placeholder: 'initialEmptyValueText',
          mode: 'output',
          tooltip: {
            title: 'binaryTypeCollectionVarText',
            body: 'binaryTypeCollectionVarDefText',
          },
          label: 'binaryTypeCollectionVarText',
          showLabel: true,
          options: [
            {
              value: 'generic',
              label: 'binaryTypeGenericBinaryItemText',
            },
            {
              value: 'image',
              label: 'binaryTypeImageItemText',
            },
            {
              value: 'sound',
              label: 'binaryTypeSoundItemText',
            },
            {
              value: 'video',
              label: 'binaryTypeVideoItemText',
            },
            {
              value: 'document',
              label: 'binaryTypeDocumentItemText',
            },
            {
              value: 'text',
              label: 'binaryTypeTextItemText',
            },
            {
              value: 'compressed',
              label: 'binaryTypeCompressedItemText',
            },
          ],
        },
      ],
      components: [
        {
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          name: 'thumbnail',
          presentationId: 'thumbnailGroup',
          type: 'group',
          mode: 'output',
          tooltip: {
            title: 'thumbnailGroupText',
            body: 'thumbnailGroupDefText',
          },
          label: 'thumbnailGroupText',
          showLabel: false,
          presentationStyle: '',
          components: [
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'thumbnail',
              presentationId: 'thumbnailResourceLink',
              type: 'resourceLink',
              tooltip: {
                title: 'resourceLinkResLinkText',
                body: 'resourceLinkResLinkDefText',
              },
              label: 'resourceLinkResLinkText',
              showLabel: false,
              outputFormat: 'image',
            },
          ],
        },
        {
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          name: 'master',
          presentationId: 'masterGroup',
          type: 'group',
          mode: 'output',
          tooltip: {
            title: 'masterGroupText',
            body: 'masterGroupDefText',
          },
          label: 'masterGroupText',
          showLabel: true,
          presentationStyle: '',
          components: [
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'originalFileName',
              presentationId: 'originalFileNameVar',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'originalFileNameTextVarText',
                body: 'originalFileNameTextVarDefText',
              },
              label: 'originalFileNameTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'master',
              presentationId: 'masterResourceLink',
              type: 'resourceLink',
              tooltip: {
                title: 'resourceLinkResLinkText',
                body: 'resourceLinkResLinkDefText',
              },
              label: 'resourceLinkResLinkText',
              showLabel: false,
              outputFormat: 'download',
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'resourceId',
              presentationId: 'resourceInVar',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'resourceIdTextVarText',
                body: 'resourceIdTextVarDefText',
              },
              label: 'resourceIdTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'fileSize',
              presentationId: 'fileSizeNumVar',
              type: 'numberVariable',
              mode: 'output',
              tooltip: {
                title: 'fileSizeNumberVarText',
                body: 'fileSizeNumberVarDefText',
              },
              label: 'fileSizeNumberVarText',
              showLabel: true,
              validation: {
                type: 'number',
                min: 0,
                max: 99999999999999,
                warningMin: 0,
                warningMax: 99999999999999,
                numberOfDecimals: 0,
              },
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'mimeType',
              presentationId: 'mimeTypeVar',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'mimeTypeTextVarText',
                body: 'mimeTypeTextVarDefText',
              },
              label: 'mimeTypeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.*',
              },
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'height',
              presentationId: 'heightNumVar',
              type: 'numberVariable',
              mode: 'output',
              tooltip: {
                title: 'heightImageBinaryNumberVarText',
                body: 'heightImageBinaryNumberVarDefText',
              },
              label: 'heightImageBinaryNumberVarText',
              showLabel: true,
              validation: {
                type: 'number',
                min: 0,
                max: 99999999999999,
                warningMin: 0,
                warningMax: 99999999999999,
                numberOfDecimals: 0,
              },
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'width',
              presentationId: 'widthNumVar',
              type: 'numberVariable',
              mode: 'output',
              tooltip: {
                title: 'widthImageBinaryNumberVarText',
                body: 'widthImageBinaryNumberVarDefText',
              },
              label: 'widthImageBinaryNumberVarText',
              showLabel: true,
              validation: {
                type: 'number',
                min: 0,
                max: 99999999999999,
                warningMin: 0,
                warningMax: 99999999999999,
                numberOfDecimals: 0,
              },
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'resolution',
              presentationId: 'resolutionVar',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'resolutionImageBinaryTextVarText',
                body: 'resolutionImageBinaryTextVarDefText',
              },
              label: 'resolutionImageBinaryTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'checksumType',
              presentationId: 'checksumTypeVar',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'checksumTypeTextVarText',
                body: 'checksumTypeTextVarDefText',
              },
              label: 'checksumTypeTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              finalValue: 'SHA-512',
            },
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'checksum',
              presentationId: 'checksumVar',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'checksumTextVarText',
                body: 'checksumTextVarDefText',
              },
              label: 'checksumTextVarText',
              showLabel: true,
              validation: {
                type: 'regex',
                pattern: '[a-fA-F0-9]*',
              },
            },
          ],
        },
      ],
    },
  },
  listPresentation: {
    form: {
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      childStyle: [],
      gridColSpan: 12,
      name: 'binary',
      type: 'group',
      mode: 'output',
      tooltip: {
        title: 'binaryGroupText',
        body: 'binaryGroupDefText',
      },
      label: 'binaryGroupText',
      showLabel: false,
      presentationStyle: '',
      attributes: [
        {
          name: 'type',
          type: 'collectionVariable',
          placeholder: 'initialEmptyValueText',
          mode: 'output',
          presentationId: 'typeCollVar',
          tooltip: {
            title: 'binaryTypeCollectionVarText',
            body: 'binaryTypeCollectionVarDefText',
          },
          label: 'binaryTypeCollectionVarText',
          showLabel: true,
          options: [
            {
              value: 'generic',
              label: 'binaryTypeGenericBinaryItemText',
            },
            {
              value: 'image',
              label: 'binaryTypeImageItemText',
            },
            {
              value: 'sound',
              label: 'binaryTypeSoundItemText',
            },
            {
              value: 'video',
              label: 'binaryTypeVideoItemText',
            },
            {
              value: 'document',
              label: 'binaryTypeDocumentItemText',
            },
            {
              value: 'text',
              label: 'binaryTypeTextItemText',
            },
            {
              value: 'compressed',
              label: 'binaryTypeCompressedItemText',
            },
          ],
        },
      ],
      components: [
        {
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          childStyle: ['eightChildStyle'],
          gridColSpan: 8,
          name: 'recordInfo',
          presentationId: 'recordInfoGroup',
          type: 'group',
          mode: 'output',
          tooltip: {
            title: 'recordInfoText',
            body: 'recordInfoDefText',
          },
          label: 'recordInfoText',
          showLabel: false,
          presentationStyle: '',
          components: [
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 0,
                repeatMax: 1,
              },
              childStyle: [],
              textStyle: 'h4TextStyle',
              gridColSpan: 12,
              name: 'id',
              presentationId: 'idVar',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'idTextVarText',
                body: 'idTextVarDefText',
              },
              label: 'idTextVarText',
              showLabel: false,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
            },
          ],
        },
        {
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: ['oneChildStyle'],
          gridColSpan: 1,
          name: 'thumbnail',
          type: 'group',
          presentationId: 'thumbnailGroup',
          mode: 'output',
          tooltip: {
            title: 'thumbnailGroupText',
            body: 'thumbnailGroupDefText',
          },
          label: 'thumbnailGroupText',
          showLabel: false,
          presentationStyle: '',
          components: [
            {
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
              name: 'thumbnail',
              presentationId: 'thumbnailResourceLink',
              type: 'resourceLink',
              tooltip: {
                title: 'resourceLinkResLinkText',
                body: 'resourceLinkResLinkDefText',
              },
              label: 'resourceLinkResLinkText',
              showLabel: false,
              outputFormat: 'image',
            },
          ],
        },
      ],
    },
  },
} satisfies BFFDataRecord;

export const formSchemaWithBinary: RecordFormSchema = {
  validationTypeId: 'publication_report',
  form: {
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    childStyle: [],
    gridColSpan: 12,
    name: 'output',
    type: 'group',
    presentationId: 'outputGroup',
    mode: 'output',
    tooltip: {
      title: 'outputUpdateGroupText',
      body: 'outputUpdateGroupDefText',
    },
    label: 'outputUpdateGroupText',
    showLabel: true,
    presentationStyle: '',
    components: [
      {
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        childStyle: [],
        gridColSpan: 12,
        name: 'recordInfo',
        presentationId: 'recordInfoGroup',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'recordInfoOutputUpdateGroupText',
          body: 'recordInfoOutputUpdateGroupDefText',
        },
        label: 'recordInfoOutputUpdateGroupText',
        showLabel: true,
        presentationStyle: '',
        components: [
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'id',
            presentationId: 'idVar',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'idDivaTextVarText',
              body: 'idDivaTextVarDefText',
            },
            label: 'idDivaTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'type',
            presentationId: 'typeRecordLink',
            type: 'recordLink',
            mode: 'output',
            tooltip: {
              title: 'recordTypeOutputLinkText',
              body: 'recordTypeOutputLinkDefText',
            },
            label: 'recordTypeOutputLinkText',
            showLabel: true,
            recordLinkType: 'recordType',
            presentationRecordLinkId: 'recordTypeOutputOutputPLink',
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'validationType',
            presentationId: 'validationTypeRecordLink',
            type: 'recordLink',
            mode: 'output',
            tooltip: {
              title: 'validationTypeOutputLinkText',
              body: 'validationTypeOutputLinkDefText',
            },
            label: 'validationTypeOutputLinkText',
            showLabel: true,
            recordLinkType: 'validationType',
            presentationRecordLinkId: 'validationTypeOutputOutputPLink',
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'dataDivider',
            presentationId: 'dataDividerRecordLink',
            type: 'recordLink',
            mode: 'output',
            tooltip: {
              title: 'dataDividerDivaDataLinkText',
              body: 'dataDividerDivaDataLinkDefText',
            },
            label: 'dataDividerDivaDataLinkText',
            showLabel: true,
            recordLinkType: 'system',
            presentationRecordLinkId: 'dataDividerDivaDataOutputPLink',
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'createdBy',
            presentationId: 'createdByRecordLink',
            type: 'recordLink',
            mode: 'output',
            tooltip: {
              title: 'createdByDivaLinkText',
              body: 'createdByDivaLinkDefText',
            },
            label: 'createdByDivaLinkText',
            showLabel: true,
            recordLinkType: 'user',
            presentationRecordLinkId: 'createdByDivaOutputPLink',
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'tsCreated',
            presentationId: 'tsCreatedVar',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'tsCreatedDivaTextVarText',
              body: 'tsCreatedDivaTextVarDefText',
            },
            label: 'tsCreatedDivaTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern:
                '^((((19|20)([2468][048]|[13579][26]|0[48])|2000)-02-29|((19|20)[0-9]{2}-(0[4678]|1[02])-(0[1-9]|[12][0-9]|30|31)|(19|20)[0-9]{2}-(0[1359]|11)-(0[1-9]|[12][0-9]|3[01])|(19|20)[0-9]{2}-02-(0[1-9]|1[0-9]|2[0-8])))T([01][0-9]|2[0-3]):([012345][0-9]):([012345][0-9])\\.([0-9]{6}Z))$',
            },
          },
          {
            childStyle: [],
            gridColSpan: 12,
            name: 'updatesMinimizedSContainer',
            type: 'container',
            presentationId: 'updatesMinimizedSContainer',
            mode: 'output',
            presentationStyle: '',
            containerType: 'surrounding',
            components: [
              {
                name: 'updatesHeadlineText',
                type: 'text',
                textStyle: 'h3TextStyle',
                childStyle: [],
                gridColSpan: 12,
              },
            ],
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'recordContentSource',
            presentationId: 'recordContentSourceCollVar',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'output',
            tooltip: {
              title: 'recordContentSourceCollectionVarText',
              body: 'recordContentSourceCollectionVarDefText',
            },
            label: 'recordContentSourceCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'bth',
                label: 'bthItemText',
              },
            ],
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'genre',
            presentationId: 'genreCollVar',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'output',
            tooltip: {
              title: 'outputTypeCollectionVarText',
              body: 'outputTypeCollectionVarDefText',
            },
            label: 'outputTypeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'artistic-work_original-creative-work',
                label: 'artisticWorkOriginalCreativeWorkItemText',
              },
            ],
            attributes: [
              {
                name: 'type',
                presentationId: 'typeCollVar',
                type: 'collectionVariable',
                placeholder: 'initialEmptyValueText',
                mode: 'output',
                tooltip: {
                  title: 'outputTypeTypeCollectionVarText',
                  body: 'outputTypeTypeCollectionVarDefText',
                },
                label: 'outputTypeTypeCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'outputType',
                    label: 'outputTypeItemText',
                  },
                ],
                finalValue: 'outputType',
              },
            ],
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'urn',
            presentationId: 'urnVar',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'urnTextVarText',
              body: 'urnTextVarDefText',
            },
            label: 'urnTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'oldId',
            presentationId: 'oldIdVar',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'oldIdTextVarText',
              body: 'oldIdTextVarDefText',
            },
            label: 'oldIdTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
          },
        ],
      },
      {
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1.7976931348623157e308,
        },
        childStyle: [],
        gridColSpan: 12,
        name: 'attachment',
        presentationId: 'attachmentGroup',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'attachmentGroupText',
          body: 'attachmentGroupDefText',
        },
        label: 'attachmentGroupText',
        showLabel: true,
        presentationStyle: '',
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
            presentationId: 'attachmentFileRecordLink',
            type: 'recordLink',
            mode: 'output',
            tooltip: {
              title: 'attachmentFileLinkText',
              body: 'attachmentFileLinkDefText',
            },
            label: 'attachmentFileLinkText',
            showLabel: true,
            recordLinkType: 'binary',
            linkedRecordPresentation: {
              presentedRecordType: 'binary',
              presentationId: 'imageGroupWhenLinkedOutputPGroup',
            },
            presentationRecordLinkId: 'attachmentFileOutputPLink',
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'type',
            presentationId: 'typeCollVar',
            type: 'collectionVariable',
            placeholder: 'initialEmptyValueText',
            mode: 'output',
            tooltip: {
              title: 'attachmentTypeCollectionVarText',
              body: 'attachmentTypeCollectionVarDefText',
            },
            label: 'attachmentTypeCollectionVarText',
            showLabel: true,
            options: [
              {
                value: 'fullText',
                label: 'fullTextItemText',
              },
              {
                value: 'attachment',
                label: 'attachmentItemText',
              },
              {
                value: 'audio',
                label: 'audioItemText',
              },
              {
                value: 'cover',
                label: 'coverItemText',
              },
              {
                value: 'dataSet',
                label: 'dataSetItemText',
              },
              {
                value: 'errata',
                label: 'errataItemText',
              },
              {
                value: 'image',
                label: 'imageDivaItemText',
              },
              {
                value: 'inside',
                label: 'insideItemText',
              },
              {
                value: 'movie',
                label: 'movieItemText',
              },
              {
                value: 'notificationOfSubmissionOfAThesis',
                label: 'notificationOfSubmissionOfAThesisItemText',
              },
              {
                value: 'popularSummary',
                label: 'popularSummaryItemText',
              },
              {
                value: 'previewImage',
                label: 'previewImageItemText',
              },
              {
                value: 'references',
                label: 'referencesItemText',
              },
              {
                value: 'software',
                label: 'softwareItemText',
              },
              {
                value: 'summary',
                label: 'summaryItemText',
              },
              {
                value: 'toc',
                label: 'tocItemText',
              },
            ],
          },
          {
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
            name: 'note',
            type: 'textVariable',
            presentationId: 'noteVar',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'noteUserMessageTextVarText',
              body: 'noteUserMessageTextVarDefText',
            },
            label: 'noteUserMessageTextVarText',
            showLabel: true,
            validation: {
              type: 'regex',
              pattern: '.+',
            },
            attributes: [
              {
                name: 'type',
                type: 'collectionVariable',
                presentationId: 'typeCollVar',
                placeholder: 'initialEmptyValueText',
                mode: 'output',
                tooltip: {
                  title: 'noteTypeCollectionVarText',
                  body: 'noteTypeCollectionVarDefText',
                },
                label: 'noteTypeCollectionVarText',
                showLabel: true,
                options: [
                  {
                    value: 'internal',
                    label: 'internalItemText',
                  },
                  {
                    value: 'external',
                    label: 'externalItemText',
                  },
                  {
                    value: 'userMessage',
                    label: 'userMessageItemText',
                  },
                ],
                finalValue: 'userMessage',
              },
            ],
          },
        ],
      },
    ],
  },
} satisfies RecordFormSchema;

export const recordWithBinary = {
  id: 'diva-output:1283798865094047',
  recordType: 'diva-output',
  validationType: 'publication_report',
  createdAt: '2025-02-20T09:14:25.982052Z',
  createdBy: '161616',
  updated: [
    {
      updateAt: '2025-02-20T09:14:25.982052Z',
      updatedBy: '161616',
    },
    {
      updateAt: '2025-02-20T09:14:38.395279Z',
      updatedBy: '161616',
    },
  ],
  actionLinks: { read: { url: '', requestMethod: 'get', rel: 'read' } },
  userRights: ['read', 'update', 'index', 'delete'],
  data: {
    output: {
      recordInfo: {
        validationType: {
          value: 'publication_report',
        },
        dataDivider: {
          value: 'divaData',
        },
        recordContentSource: {
          value: 'bth',
        },
        genre_type_outputType: {
          value: 'publication_report',
          _type: 'outputType',
        },
        id: {
          value: 'diva-output:1283798865094047',
        },
        type: {
          value: 'diva-output',
        },
        createdBy: {
          value: '161616',
        },
        tsCreated: {
          value: '2025-02-20T09:14:25.982052Z',
        },
        updated: [
          {
            tsUpdated: {
              value: '2025-02-20T09:14:38.395279Z',
            },
            updatedBy: {
              value: '161616',
            },
          },
        ],
      },
      attachment: [
        {
          attachmentFile: {
            value: 'binary:1283806137807105',
          },
          type: {
            value: 'image',
          },
        },
      ],
    },
  },
} satisfies BFFDataRecord;
