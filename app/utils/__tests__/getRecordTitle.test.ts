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
 */
import type { DivaOutput } from '@/generatedTypes/divaTypes';
import type { BFFDataRecord, RecordInfo } from '@/types/record';
import { getRecordTitle } from '@/utils/getRecordTitle';
import { describe, expect, it } from 'vitest';

describe('getRecordTitle', () => {
  it('shows title for report', () => {
    const formData = {
      id: 'diva-output:10211259349608221',
      recordType: 'diva-output',
      validationType: 'publication_report',
      createdAt: '2024-12-16T12:27:23.840907Z',
      createdBy: '161616',
      updated: [
        {
          updateAt: '2024-12-16T12:27:23.840907Z',
          updatedBy: '161616',
        },
      ],
      userRights: ['read', 'update', 'index', 'delete'],
      data: {
        output: {
          titleInfo: {
            title: {
              value: 'someTitle',
            },
            _lang: 'arg',
          },
        },
      } as DivaOutput,
      actionLinks: { read: { url: '', rel: 'read', requestMethod: 'GET' } },
    } satisfies BFFDataRecord<DivaOutput>;
    const actual = getRecordTitle(formData, 'sv');
    expect(actual).toBe('someTitle');
  });

  it('shows title for diva-output', () => {
    const formData = {
      id: 'diva-output:10211259349608221',
      recordType: 'diva-output',
      validationType: 'publication_report',
      createdAt: '2024-12-16T12:27:23.840907Z',
      createdBy: '161616',
      updated: [
        {
          updateAt: '2024-12-16T12:27:23.840907Z',
          updatedBy: '161616',
        },
      ],
      userRights: ['read', 'update', 'index', 'delete'],
      data: {
        output: {
          titleInfo: {
            title: {
              value: 'someTitle',
            },
            _lang: 'arg',
          },
          recordInfo,
        },
      },
      actionLinks: { read: { url: '', rel: 'read', requestMethod: 'GET' } },
    } satisfies BFFDataRecord;

    const actual = getRecordTitle(formData, 'sv');
    expect(actual).toBe('someTitle');
  });

  it('returns undefined when data has unexpected format', () => {
    const formData = {
      id: 'diva-output:10211259349608221',
      recordType: 'diva-output',
      validationType: 'publication_report',
      createdAt: '2024-12-16T12:27:23.840907Z',
      createdBy: '161616',
      updated: [
        {
          updateAt: '2024-12-16T12:27:23.840907Z',
          updatedBy: '161616',
        },
      ],
      userRights: ['read', 'update', 'index', 'delete'],
      data: {
        output: {
          recordInfo,
        },
      },
      actionLinks: { read: { url: '', rel: 'read', requestMethod: 'GET' } },
    } satisfies BFFDataRecord;

    const actual = getRecordTitle(formData, 'sv');
    expect(actual).toBeUndefined();
  });
});

const recordInfo: RecordInfo = {
  recordContentSource: {
    value: 'hb',
  },
  genre: {
    value: 'diva-output',
    _type: 'outputType',
  },
  validationType: {
    value: 'diva-output',
  },
  dataDivider: {
    value: 'divaData',
  },
  id: {
    value: 'diva-output:10211259349608221',
  },
  type: {
    value: 'diva-output',
  },

  createdBy: {
    value: '161616',
  },
  tsCreated: {
    value: '2024-12-16T12:27:23.840907Z',
  },

  updated: [
    {
      tsUpdated: {
        value: '2024-12-16T12:27:23.840907Z',
      },
      updatedBy: {
        value: '161616',
      },
    },
  ],
};
