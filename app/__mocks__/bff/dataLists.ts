import type { DataListWrapper } from '@/cora/cora-data/types.server';

export const dataListWithTwoRecords: DataListWrapper = {
  dataList: {
    containDataOfType: 'mix',
    data: [
      {
        record: {
          data: {
            name: 'someNameInData',
            children: [],
          },
          actionLinks: {
            read: {
              url: '',
              rel: 'read',
              requestMethod: 'GET',
            },
          },
        },
      },
      {
        record: {
          data: {
            name: 'someNameInData2',
            children: [],
          },
          actionLinks: {
            read: {
              url: '',
              rel: 'read',
              requestMethod: 'GET',
            },
          },
        },
      },
    ],
    fromNo: '1',
    toNo: '2',
    totalNo: '2',
  },
};

export const dataListWithThreeRecords: DataListWrapper = {
  dataList: {
    containDataOfType: 'mix',
    data: [
      {
        record: {
          data: {
            name: 'someNameInData',
            children: [],
          },
          actionLinks: {
            read: {
              url: '',
              rel: 'read',
              requestMethod: 'GET',
            },
          },
        },
      },
      {
        record: {
          data: {
            name: 'someNameInData2',
            children: [],
          },
          actionLinks: {
            read: {
              url: '',
              rel: 'read',
              requestMethod: 'GET',
            },
          },
        },
      },
      {
        record: {
          data: {
            name: 'someNameInData3',
            children: [],
          },
          actionLinks: {
            read: {
              url: '',
              rel: 'read',
              requestMethod: 'GET',
            },
          },
        },
      },
    ],
    fromNo: '3',
    toNo: '6',
    totalNo: '3',
  },
};
