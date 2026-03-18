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
  record: {
    record: {
      data: {
        children: [
          {
            children: [
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'system',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'divaData',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/system/divaData',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'dataDivider',
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'validationType',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'genericBinary',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/validationType/genericBinary',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'validationType',
              },
              {
                name: 'visibility',
                value: 'unpublished',
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'diva-output',
                  },
                  {
                    name: 'linkedRecordId',
                    value: '18',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/diva-output/18',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'hostRecord',
              },
              {
                name: 'id',
                value: 'binary:34466800953608169',
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'recordType',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'binary',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/recordType/binary',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'type',
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'user',
                  },
                  {
                    name: 'linkedRecordId',
                    value: '161616',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/user/161616',
                    accept: 'application/vnd.cora.record+json',
                  },
                },
                name: 'createdBy',
              },
              {
                name: 'tsCreated',
                value: '2026-03-11T10:44:28.070551Z',
              },
              {
                repeatId: '0',
                children: [
                  {
                    name: 'tsUpdated',
                    value: '2026-03-11T10:44:30.114890Z',
                  },
                  {
                    children: [
                      {
                        name: 'linkedRecordType',
                        value: 'user',
                      },
                      {
                        name: 'linkedRecordId',
                        value: 'binaryConverter',
                      },
                    ],
                    actionLinks: {
                      read: {
                        requestMethod: 'GET',
                        rel: 'read',
                        url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/user/binaryConverter',
                        accept: 'application/vnd.cora.record+json',
                      },
                    },
                    name: 'updatedBy',
                  },
                ],
                name: 'updated',
              },
              {
                name: 'tsVisibility',
                value: '2026-03-11T10:44:28.070059Z',
              },
            ],
            name: 'recordInfo',
          },
          {
            children: [
              {
                name: 'resourceId',
                value: 'binary:34466800953608169-master',
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'binary',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'binary:34466800953608169',
                  },
                  {
                    name: 'mimeType',
                    value: 'application/pdf',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/binary/binary:34466800953608169/master',
                    accept: 'application/pdf',
                  },
                },
                name: 'master',
              },
              {
                name: 'fileSize',
                value: '8628357',
              },
              {
                name: 'mimeType',
                value: 'application/pdf',
              },
              {
                name: 'checksum',
                value:
                  '9584d3a54bd1a7003519f7de07006f837ab4e43cbed9a0c2872174b2d7a3c329aa26ef8d5ec2eca3c26b0d6fcdb6057e38becf878763608a8346a8923c1d8cfb',
              },
              {
                name: 'checksumType',
                value: 'SHA-512',
              },
              {
                name: 'originalFileName',
                value: 'FULLTEXT01.pdf',
              },
            ],
            name: 'master',
          },
          {
            children: [
              {
                name: 'resourceId',
                value:
                  '/tmp/sharedFileStorage/diva/streams/divaData/6ff/d60/fc3/6ffd60fc39a78dd0d4f1d54be4f44e0c96b2ce73c87c058f5b3206f3e5fcb3d2/binary:binary:34466800953608169-large',
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'binary',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'binary:34466800953608169',
                  },
                  {
                    name: 'mimeType',
                    value: 'image/jpeg',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/binary/binary:34466800953608169/large',
                    accept: 'image/jpeg',
                  },
                },
                name: 'large',
              },
              {
                name: 'fileSize',
                value: '85151',
              },
              {
                name: 'mimeType',
                value: 'image/jpeg',
              },
              {
                name: 'height',
                value: '788',
              },
              {
                name: 'width',
                value: '600',
              },
            ],
            name: 'large',
          },
          {
            children: [
              {
                name: 'resourceId',
                value:
                  '/tmp/sharedFileStorage/diva/streams/divaData/6ff/d60/fc3/6ffd60fc39a78dd0d4f1d54be4f44e0c96b2ce73c87c058f5b3206f3e5fcb3d2/binary:binary:34466800953608169-medium',
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'binary',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'binary:34466800953608169',
                  },
                  {
                    name: 'mimeType',
                    value: 'image/jpeg',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/binary/binary:34466800953608169/medium',
                    accept: 'image/jpeg',
                  },
                },
                name: 'medium',
              },
              {
                name: 'fileSize',
                value: '28236',
              },
              {
                name: 'mimeType',
                value: 'image/jpeg',
              },
              {
                name: 'height',
                value: '394',
              },
              {
                name: 'width',
                value: '300',
              },
            ],
            name: 'medium',
          },
          {
            children: [
              {
                name: 'resourceId',
                value:
                  '/tmp/sharedFileStorage/diva/streams/divaData/6ff/d60/fc3/6ffd60fc39a78dd0d4f1d54be4f44e0c96b2ce73c87c058f5b3206f3e5fcb3d2/binary:binary:34466800953608169-thumbnail',
              },
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'binary',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'binary:34466800953608169',
                  },
                  {
                    name: 'mimeType',
                    value: 'image/jpeg',
                  },
                ],
                actionLinks: {
                  read: {
                    requestMethod: 'GET',
                    rel: 'read',
                    url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/binary/binary:34466800953608169/thumbnail',
                    accept: 'image/jpeg',
                  },
                },
                name: 'thumbnail',
              },
              {
                name: 'fileSize',
                value: '8841',
              },
              {
                name: 'mimeType',
                value: 'image/jpeg',
              },
              {
                name: 'height',
                value: '131',
              },
              {
                name: 'width',
                value: '100',
              },
            ],
            name: 'thumbnail',
          },
        ],
        name: 'binary',
        attributes: {
          type: 'document',
        },
      },
      permissions: {
        read: [
          'originalFileName',
          'resourceId',
          'thumbnail',
          'large',
          'checksum',
          'checksumType',
          'medium',
          'resourceInfo',
          'jp2',
          'master',
        ],
        write: [
          'originalFileName',
          'resourceId',
          'thumbnail',
          'large',
          'checksum',
          'checksumType',
          'medium',
          'resourceInfo',
          'jp2',
          'master',
        ],
      },
      actionLinks: {
        read: {
          requestMethod: 'GET',
          rel: 'read',
          url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/binary/binary:34466800953608169',
          accept: 'application/vnd.cora.record+json',
        },
        upload: {
          requestMethod: 'POST',
          rel: 'upload',
          contentType: 'multipart/form-data',
          url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/binary/binary:34466800953608169/master',
        },
        read_incoming_links: {
          requestMethod: 'GET',
          rel: 'read_incoming_links',
          url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/binary/binary:34466800953608169/incomingLinks',
          accept: 'application/vnd.cora.recordList+json',
        },
        update: {
          requestMethod: 'POST',
          rel: 'update',
          contentType: 'application/vnd.cora.recordgroup+json',
          url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/binary/binary:34466800953608169',
          accept: 'application/vnd.cora.record+json',
        },
        index: {
          requestMethod: 'POST',
          rel: 'index',
          body: {
            children: [
              {
                children: [
                  {
                    name: 'linkedRecordType',
                    value: 'recordType',
                  },
                  {
                    name: 'linkedRecordId',
                    value: 'binary',
                  },
                ],
                name: 'recordType',
              },
              {
                name: 'recordId',
                value: 'binary:34466800953608169',
              },
              {
                name: 'type',
                value: 'index',
              },
            ],
            name: 'workOrder',
          },
          contentType: 'application/vnd.cora.recordgroup+json',
          url: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/workOrder/',
          accept: 'application/vnd.cora.record+json',
        },
      },
    },
  },
  presentation: {
    form: {
      presentationId: 'imageGroupWhenLinkedOutputPGroup',
      type: 'group',
      name: 'binary',
      mode: 'output',
      tooltip: {
        title: 'binaryGroupText',
        body: 'binaryGroupDefText',
      },
      label: 'binaryGroupText',
      showLabel: true,
      attributes: [
        {
          type: 'collectionVariable',
          name: 'type',
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
          presentationId: 'thumbnailOnlyImageOutputPGroup',
          type: 'group',
          name: 'thumbnail',
          mode: 'output',
          tooltip: {
            title: 'thumbnailGroupText',
            body: 'thumbnailGroupDefText',
          },
          label: 'thumbnailGroupText',
          showLabel: false,
          components: [
            {
              presentationId: 'thumbnailImagePResLink',
              name: 'thumbnail',
              tooltip: {
                title: 'resourceLinkResLinkText',
                body: 'resourceLinkResLinkDefText',
              },
              label: 'resourceLinkResLinkText',
              showLabel: false,
              type: 'resourceLink',
              outputFormat: 'image',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
            },
          ],
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
          alternativePresentation: {
            presentationId: 'thumbnailOutputPGroup',
            type: 'group',
            name: 'thumbnail',
            mode: 'output',
            tooltip: {
              title: 'thumbnailGroupText',
              body: 'thumbnailGroupDefText',
            },
            label: 'thumbnailGroupText',
            showLabel: true,
            components: [
              {
                presentationId: 'thumbnailImagePResLink',
                name: 'thumbnail',
                tooltip: {
                  title: 'resourceLinkResLinkText',
                  body: 'resourceLinkResLinkDefText',
                },
                label: 'resourceLinkResLinkText',
                showLabel: false,
                type: 'resourceLink',
                outputFormat: 'image',
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: [],
                gridColSpan: 12,
              },
              {
                presentationId: 'resourceIdOutputPVar',
                name: 'resourceId',
                mode: 'output',
                tooltip: {
                  title: 'resourceIdTextVarText',
                  body: 'resourceIdTextVarDefText',
                },
                label: 'resourceIdTextVarText',
                showLabel: true,
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^\\S.*$',
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
                presentationId: 'fileSizeOutputPNumVar',
                name: 'fileSize',
                mode: 'output',
                tooltip: {
                  title: 'fileSizeNumberVarText',
                  body: 'fileSizeNumberVarDefText',
                },
                label: 'fileSizeNumberVarText',
                showLabel: true,
                type: 'numberVariable',
                validation: {
                  type: 'number',
                  min: 0,
                  max: 99999999999999,
                  warningMin: 0,
                  warningMax: 99999999999999,
                  numberOfDecimals: 0,
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
                presentationId: 'mimeTypeTextVarOutputPVar',
                name: 'mimeType',
                mode: 'output',
                tooltip: {
                  title: 'mimeTypeTextVarText',
                  body: 'mimeTypeTextVarDefText',
                },
                label: 'mimeTypeTextVarText',
                showLabel: true,
                type: 'textVariable',
                validation: {
                  type: 'regex',
                  pattern: '^\\S.*$',
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
                presentationId: 'heightImageBinaryOutputPNumVar',
                name: 'height',
                mode: 'output',
                tooltip: {
                  title: 'heightImageBinaryNumberVarText',
                  body: 'heightImageBinaryNumberVarDefText',
                },
                label: 'heightImageBinaryNumberVarText',
                showLabel: true,
                type: 'numberVariable',
                validation: {
                  type: 'number',
                  min: 0,
                  max: 99999999999999,
                  warningMin: 0,
                  warningMax: 99999999999999,
                  numberOfDecimals: 0,
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
                presentationId: 'widthImageBinaryOutputPNumVar',
                name: 'width',
                mode: 'output',
                tooltip: {
                  title: 'widthImageBinaryNumberVarText',
                  body: 'widthImageBinaryNumberVarDefText',
                },
                label: 'widthImageBinaryNumberVarText',
                showLabel: true,
                type: 'numberVariable',
                validation: {
                  type: 'number',
                  min: 0,
                  max: 99999999999999,
                  warningMin: 0,
                  warningMax: 99999999999999,
                  numberOfDecimals: 0,
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
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            childStyle: [],
            gridColSpan: 12,
          },
        },
        {
          presentationId: 'masterOutputPGroup',
          type: 'group',
          name: 'master',
          mode: 'output',
          tooltip: {
            title: 'masterGroupText',
            body: 'masterGroupDefText',
          },
          label: 'masterGroupText',
          showLabel: true,
          components: [
            {
              presentationId: 'originalFileNameOutputPVar',
              name: 'originalFileName',
              mode: 'output',
              tooltip: {
                title: 'originalFileNameTextVarText',
                body: 'originalFileNameTextVarDefText',
              },
              label: 'originalFileNameTextVarText',
              showLabel: true,
              type: 'textVariable',
              validation: {
                type: 'regex',
                pattern: '^\\S.*$',
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
              presentationId: 'masterImagePResLink',
              name: 'master',
              tooltip: {
                title: 'resourceLinkResLinkText',
                body: 'resourceLinkResLinkDefText',
              },
              label: 'resourceLinkResLinkText',
              showLabel: false,
              type: 'resourceLink',
              outputFormat: 'download',
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [],
              gridColSpan: 12,
            },
            {
              presentationId: 'resourceIdOutputPVar',
              name: 'resourceId',
              mode: 'output',
              tooltip: {
                title: 'resourceIdTextVarText',
                body: 'resourceIdTextVarDefText',
              },
              label: 'resourceIdTextVarText',
              showLabel: true,
              type: 'textVariable',
              validation: {
                type: 'regex',
                pattern: '^\\S.*$',
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
              presentationId: 'fileSizeOutputPNumVar',
              name: 'fileSize',
              mode: 'output',
              tooltip: {
                title: 'fileSizeNumberVarText',
                body: 'fileSizeNumberVarDefText',
              },
              label: 'fileSizeNumberVarText',
              showLabel: true,
              type: 'numberVariable',
              validation: {
                type: 'number',
                min: 0,
                max: 99999999999999,
                warningMin: 0,
                warningMax: 99999999999999,
                numberOfDecimals: 0,
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
              presentationId: 'mimeTypeTextVarOutputPVar',
              name: 'mimeType',
              mode: 'output',
              tooltip: {
                title: 'mimeTypeTextVarText',
                body: 'mimeTypeTextVarDefText',
              },
              label: 'mimeTypeTextVarText',
              showLabel: true,
              type: 'textVariable',
              validation: {
                type: 'regex',
                pattern: '^\\S.*$',
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
              presentationId: 'heightImageBinaryOutputPNumVar',
              name: 'height',
              mode: 'output',
              tooltip: {
                title: 'heightImageBinaryNumberVarText',
                body: 'heightImageBinaryNumberVarDefText',
              },
              label: 'heightImageBinaryNumberVarText',
              showLabel: true,
              type: 'numberVariable',
              validation: {
                type: 'number',
                min: 0,
                max: 99999999999999,
                warningMin: 0,
                warningMax: 99999999999999,
                numberOfDecimals: 0,
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
              presentationId: 'widthImageBinaryOutputPNumVar',
              name: 'width',
              mode: 'output',
              tooltip: {
                title: 'widthImageBinaryNumberVarText',
                body: 'widthImageBinaryNumberVarDefText',
              },
              label: 'widthImageBinaryNumberVarText',
              showLabel: true,
              type: 'numberVariable',
              validation: {
                type: 'number',
                min: 0,
                max: 99999999999999,
                warningMin: 0,
                warningMax: 99999999999999,
                numberOfDecimals: 0,
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
              presentationId: 'resolutionImageBinaryOutputPVar',
              name: 'resolution',
              mode: 'output',
              tooltip: {
                title: 'resolutionImageBinaryTextVarText',
                body: 'resolutionImageBinaryTextVarDefText',
              },
              label: 'resolutionImageBinaryTextVarText',
              showLabel: true,
              type: 'textVariable',
              validation: {
                type: 'regex',
                pattern: '^\\S.*$',
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
              presentationId: 'checksumTypeOutputPVar',
              name: 'checksumType',
              mode: 'output',
              tooltip: {
                title: 'checksumTypeTextVarText',
                body: 'checksumTypeTextVarDefText',
              },
              label: 'checksumTypeTextVarText',
              showLabel: true,
              type: 'textVariable',
              validation: {
                type: 'regex',
                pattern: '^\\S.*$',
              },
              finalValue: 'SHA-512',
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
              presentationId: 'checksumOutputPVar',
              name: 'checksum',
              mode: 'output',
              tooltip: {
                title: 'checksumTextVarText',
                body: 'checksumTextVarDefText',
              },
              label: 'checksumTextVarText',
              showLabel: true,
              type: 'textVariable',
              validation: {
                type: 'regex',
                pattern: '[a-fA-F0-9]*',
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
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 0,
            repeatMax: 1,
          },
          childStyle: [],
          gridColSpan: 12,
        },
      ],
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      gridColSpan: 12,
    },
  },
};

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
    components: [
      {
        type: 'resourceLink',
        name: 'attachment',
        outputFormat: 'image',
        presentationId: 'attachmentImage',
        mode: 'output',
      },
      {
        type: 'resourceLink',
        name: 'attachment',
        outputFormat: 'download',
        presentationId: 'attachmentLink',
        mode: 'output',
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
      attachment: {
        mimeType: 'image/jpeg',
        id: 'binary:34466800953608169',
        name: 'binary',
      },
    },
  },
} satisfies BFFDataRecord;
