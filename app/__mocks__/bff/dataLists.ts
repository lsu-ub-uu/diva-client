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
        },
      },
      {
        record: {
          data: {
            name: 'someNameInData2',
            children: [],
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
        },
      },
      {
        record: {
          data: {
            name: 'someNameInData2',
            children: [],
          },
        },
      },
      {
        record: {
          data: {
            name: 'someNameInData3',
            children: [],
          },
        },
      },
    ],
    fromNo: '3',
    toNo: '6',
    totalNo: '3',
  },
};
