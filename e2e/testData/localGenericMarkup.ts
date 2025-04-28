import type { DataGroup } from '@/cora/cora-data/types.server';

export const createLocalGenericMarkup = (permissionUnit = 'uu'): DataGroup => ({
  name: 'localGenericMarkup',
  children: [
    {
      name: 'recordInfo',
      children: [
        {
          name: 'validationType',
          children: [
            { name: 'linkedRecordType', value: 'validationType' },
            { name: 'linkedRecordId', value: 'diva-localGenericMarkup' },
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
      ],
    },
    { name: 'localGenericMarkup', value: 'Lorem ipsum' },
    { name: 'description', value: 'Lorem ipsum dolor sit amet' },
  ],
});
