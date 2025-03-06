import { faker } from '@faker-js/faker';
import type { DataGroup } from '@/cora/cora-data/types.server';

export const divaOutputWithMinimalData: DataGroup = {
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
        { name: 'recordContentSource', value: 'hig' },
        {
          name: 'genre',
          value: 'publication_report',
          attributes: { type: 'outputType' },
        },
      ],
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
    {
      name: 'adminInfo',
      children: [{ name: 'visibility', value: 'published' }],
    },
  ],
};
