import type { DataGroup } from '@/cora/cora-data/CoraData.server';
import { faker } from '@faker-js/faker';

export const divaOutputWithMinimalData: DataGroup = {
  name: 'output',
  children: [
    {
      name: 'adminInfo',
      children: [{ name: 'visibility', value: 'published' }],
    },
    { name: 'admin', children: [{ name: 'reviewed', value: 'true' }] },
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
    {
      name: 'titleInfo',
      children: [{ name: 'title', value: faker.book.title() }],
      attributes: { lang: 'ang' },
    },
    { name: 'genre', value: 'vet', attributes: { type: 'contentType' } },
    {
      name: 'language',
      children: [
        {
          name: 'languageTerm',
          value: 'afh',
          attributes: { type: 'code', authority: 'iso639-2b' },
        },
      ],
      repeatId: '0',
    },
    {
      name: 'recordInfo',
      children: [
        { name: 'recordContentSource', value: 'hb' },
        {
          name: 'validationType',
          children: [
            { name: 'linkedRecordType', value: 'validationType' },
            { name: 'linkedRecordId', value: 'diva-output' },
          ],
        },
        {
          name: 'dataDivider',
          children: [
            { name: 'linkedRecordType', value: 'system' },
            { name: 'linkedRecordId', value: 'divaData' },
          ],
        },
      ],
    },
  ],
};
