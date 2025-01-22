import type { CoraRecord } from '@/cora/cora-data/types.server';

export const authDataForOnePerson: CoraRecord = {
  data: {
    children: [
      {
        name: 'id',
        value: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
      },
      {
        name: 'validForNoSeconds',
        value: '600',
      },
      {
        name: 'idInUserStorage',
        value: 'coraUser:111111111111111',
      },
      {
        name: 'idFromLogin',
        value: 'coraUser:111111111111111',
      },
      {
        name: 'firstName',
        value: 'Everything',
      },
      {
        name: 'lastName',
        value: 'DiVA',
      },
    ],
    name: 'authToken',
  },
  actionLinks: {
    delete: {
      requestMethod: 'DELETE',
      rel: 'delete',
      url: 'https://cora.epc.ub.uu.se/apptokenverifier/rest/apptoken/coraUser:111111111111111',
    },
  },
};
