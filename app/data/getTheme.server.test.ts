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

import { describe, expect } from 'vitest';
import { transformTheme } from '@/data/getTheme.server';

describe('getTheme()', () => {
  it('gets a theme', () => {
    const acutal = transformTheme({
      record: {
        data: {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'validationType',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'diva-theme',
                    },
                  ],
                  actionLinks: {
                    read: {
                      requestMethod: 'GET',
                      rel: 'read',
                      url: 'https://cora.epc.ub.uu.se/diva/rest/record/validationType/diva-theme',
                      accept: 'application/vnd.uub.record+json',
                    },
                  },
                  name: 'validationType',
                },
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'system',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'diva',
                    },
                  ],
                  actionLinks: {
                    read: {
                      requestMethod: 'GET',
                      rel: 'read',
                      url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/diva',
                      accept: 'application/vnd.uub.record+json',
                    },
                  },
                  name: 'dataDivider',
                },
                {
                  name: 'id',
                  value: 'uu-theme',
                },
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'recordType',
                    },
                    {
                      name: 'linkedRecordId',
                      value: 'diva-theme',
                    },
                  ],
                  actionLinks: {
                    read: {
                      requestMethod: 'GET',
                      rel: 'read',
                      url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/diva-theme',
                      accept: 'application/vnd.uub.record+json',
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
                  name: 'createdBy',
                },
                {
                  name: 'tsCreated',
                  value: '2025-02-21T13:48:55.817131Z',
                },
                {
                  repeatId: '0',
                  children: [
                    {
                      name: 'tsUpdated',
                      value: '2025-02-21T13:48:55.817131Z',
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
                      name: 'updatedBy',
                    },
                  ],
                  name: 'updated',
                },
                {
                  repeatId: '1',
                  children: [
                    {
                      name: 'tsUpdated',
                      value: '2025-02-21T13:49:39.460471Z',
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
                      name: 'updatedBy',
                    },
                  ],
                  name: 'updated',
                },
                {
                  repeatId: '2',
                  children: [
                    {
                      name: 'tsUpdated',
                      value: '2025-02-21T13:49:41.781021Z',
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
                      name: 'updatedBy',
                    },
                  ],
                  name: 'updated',
                },
              ],
              name: 'recordInfo',
            },
            {
              name: 'backgroundColor',
              value: '#CCCCCC',
            },
            {
              name: 'textColor',
              value: '#990000',
            },
            {
              repeatId: '0',
              children: [
                {
                  name: 'displayLabel',
                  value: 'Uppsala universitetsbibliotek',
                },
                {
                  name: 'url',
                  value: 'https://www.uu.se/en/library',
                },
              ],
              name: 'link',
            },
            {
              repeatId: '1',
              children: [
                {
                  name: 'displayLabel',
                  value: 'Fråga biblioteket',
                },
                {
                  name: 'url',
                  value: 'http://libanswers.ub.uu.se/en',
                },
              ],
              name: 'link',
            },
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'binary',
                },
                {
                  name: 'linkedRecordId',
                  value: 'binary:940955447470971',
                },
              ],
              name: 'logo',
            },
          ],
          name: 'diva-theme',
        },
        actionLinks: {
          read: {
            requestMethod: 'GET',
            rel: 'read',
            url: 'https://cora.epc.ub.uu.se/diva/rest/record/diva-theme/uu-theme',
            accept: 'application/vnd.uub.record+json',
          },
        },
      },
    });
    expect(acutal).toStrictEqual({
      backgroundColor: '#CCCCCC',
      logoUrl:
        'http://130.238.171.238:38082/diva/rest/record/binary/binary:940955447470971',
      textColor: '#990000',
    });
  });
});
