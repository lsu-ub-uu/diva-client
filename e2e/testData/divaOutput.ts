import type { DataGroup } from '@/cora/cora-data/types.server';
import { faker } from '@faker-js/faker';

export const createDivaOutput = (permissionUnit: string = 'uu'): DataGroup => ({
  name: 'output',
  children: [
    {
      name: 'recordInfo',
      children: [
        {
          name: 'validationType',
          children: [
            { name: 'linkedRecordType', value: 'validationType' },
            { name: 'linkedRecordId', value: 'publication_report' },
          ],
        },
        {
          name: 'dataDivider',
          children: [
            { name: 'linkedRecordType', value: 'system' },
            { name: 'linkedRecordId', value: 'divaData' },
          ],
        },
        {
          name: 'permissionUnit',
          children: [
            { name: 'linkedRecordType', value: 'permissionUnit' },
            { name: 'linkedRecordId', value: permissionUnit },
          ],
        },
        {
          name: 'visibility',
          value: 'published',
        },
      ],
    },
    {
      name: 'genre',
      value: 'publication_report',
      attributes: { type: 'outputType' },
    },
    {
      name: 'language',
      repeatId: '0',
      children: [
        {
          name: 'languageTerm',
          value: 'ain',
          attributes: { type: 'code', authority: 'iso639-2b' },
        },
      ],
    },
    { name: 'genre', value: 'vet', attributes: { type: 'contentType' } },
    {
      name: 'titleInfo',
      children: [{ name: 'title', value: faker.book.title() }],
      attributes: { lang: 'alt' },
    },
    {
      name: 'originInfo',
      children: [
        {
          name: 'dateIssued',
          children: [
            {
              name: 'year',
              value: faker.date.recent().getFullYear().toString(),
            },
          ],
        },
      ],
    },
    { name: 'admin', children: [{ name: 'reviewed', value: 'true' }] },
  ],
});
