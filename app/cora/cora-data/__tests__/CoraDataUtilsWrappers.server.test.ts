/*
 * Copyright 2023 Uppsala University Library
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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  getAllDataAtomicsWithNameInData,
  getFirstDataAtomicWithNameInData,
  getFirstDataGroupWithNameInData,
  getFirstDataGroupWithNameInDataAndAttributes,
} from '../CoraDataUtils.server';
import {
  extractDataGroupFollowingNameInDatas,
  extractFirstDataGroupWithAttributesFollowingNameInDatas,
  getAllDataAtomicValuesWithNameInData,
  getFirstDataAtomicValueWithNameInData,
} from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import type { DataGroup } from '@/cora/cora-data/types.server';

vi.mock('../CoraDataUtils.server');

const mockGetFirstDataAtomicWithNameInData = vi.mocked(
  getFirstDataAtomicWithNameInData,
);

const mockGetAllDataAtomicsWithNameInData = vi.mocked(
  getAllDataAtomicsWithNameInData,
);

const mockGetFirstDataGroupWithNameInDataAndAttributes = vi.mocked(
  getFirstDataGroupWithNameInDataAndAttributes,
);

const mockGetFirstDataGroupWithNameInData = vi.mocked(
  getFirstDataGroupWithNameInData,
);

const someEmptyDataGroup: DataGroup = {
  name: 'someEmptyDataGroup',
  children: [],
};

const someNonEmptyDataGroup: DataGroup = {
  name: 'someNonEmptyDataGroup',
  children: [
    {
      name: 'someChild',
      value: 'someValue',
    },
  ],
};

const someNestedDataGroup: DataGroup = {
  name: 'someInterestingChildDataGroup',
  children: [
    {
      name: 'someAtomic',
      value: 'someAtomicValue',
    },
  ],
};

const someTwoLevelDataGroup: DataGroup = {
  name: 'someDataGroup',
  children: [
    {
      name: 'someChildDataGroup',
      children: [],
    },
    someNestedDataGroup,
  ],
};

beforeEach(() => {
  mockGetFirstDataAtomicWithNameInData.mockReturnValue({
    name: 'someDefaultNameInData',
    value: 'someDefaultValue',
  });

  mockGetAllDataAtomicsWithNameInData.mockReturnValue([]);

  mockGetFirstDataGroupWithNameInDataAndAttributes.mockReturnValue(
    someNonEmptyDataGroup,
  );

  mockGetFirstDataGroupWithNameInData.mockReturnValue(someNonEmptyDataGroup);
});

const dataGroupWithEmptyChildren: DataGroup = {
  name: 'someName',
  children: [],
};

describe('getFirstDataAtomicValueWithNameInData', () => {
  it('should take dataGroup and nameInData', () => {
    getFirstDataAtomicValueWithNameInData(
      dataGroupWithEmptyChildren,
      'someChildName',
    );
  });

  it('should call getFirstDataAtomicWithNameInData with dataGroup and nameInData', () => {
    getFirstDataAtomicValueWithNameInData(
      dataGroupWithEmptyChildren,
      'someChildName',
    );

    expect(mockGetFirstDataAtomicWithNameInData).toHaveBeenCalled();
    expect(mockGetFirstDataAtomicWithNameInData).toHaveBeenCalledWith(
      dataGroupWithEmptyChildren,
      'someChildName',
    );

    const otherDataGroup: DataGroup = {
      name: 'someOtherName',
      children: [{ name: 'someName', value: 'someValue' }],
    };

    getFirstDataAtomicValueWithNameInData(otherDataGroup, 'someOtherChildName');

    expect(mockGetFirstDataAtomicWithNameInData).toHaveBeenCalledTimes(2);
    expect(mockGetFirstDataAtomicWithNameInData).toHaveBeenNthCalledWith(
      2,
      otherDataGroup,
      'someOtherChildName',
    );
  });

  it("getFirstDataAtomicValueWithNameInData returns the dataAtomic's string value", () => {
    mockGetFirstDataAtomicWithNameInData.mockReturnValueOnce({
      name: 'someChildName',
      value: 'someInterestingValue',
    });

    expect(
      getFirstDataAtomicValueWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      ),
    ).toStrictEqual('someInterestingValue');

    mockGetFirstDataAtomicWithNameInData.mockReturnValueOnce({
      name: 'someChildName',
      value: 'someOtherInterestingValue',
    });

    expect(
      getFirstDataAtomicValueWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      ),
    ).toStrictEqual('someOtherInterestingValue');
  });
});

describe('getAllDataAtomicValuesWithNameInData', () => {
  it('should take dataGroup and nameInData', () => {
    getAllDataAtomicValuesWithNameInData(
      dataGroupWithEmptyChildren,
      'someChildName',
    );
  });

  it('should call getAllDataAtomicsWithNameInData with dataGroup and nameInData', () => {
    getAllDataAtomicValuesWithNameInData(
      dataGroupWithEmptyChildren,
      'someChildName',
    );

    expect(mockGetAllDataAtomicsWithNameInData).toHaveBeenCalled();
    expect(mockGetAllDataAtomicsWithNameInData).toHaveBeenCalledWith(
      dataGroupWithEmptyChildren,
      'someChildName',
    );

    const otherDataGroup: DataGroup = {
      name: 'someOtherName',
      children: [{ name: 'someName', value: 'someValue' }],
    };

    getAllDataAtomicValuesWithNameInData(otherDataGroup, 'someOtherChildName');

    expect(mockGetAllDataAtomicsWithNameInData).toHaveBeenCalledTimes(2);
    expect(mockGetAllDataAtomicsWithNameInData).toHaveBeenNthCalledWith(
      2,
      otherDataGroup,
      'someOtherChildName',
    );
  });

  it('should return empty array, if getAllDataAtomicsWithNameInData returns empty array', () => {
    mockGetAllDataAtomicsWithNameInData.mockReturnValueOnce([]);
    expect(
      getAllDataAtomicValuesWithNameInData(
        dataGroupWithEmptyChildren,
        'someOtherChildName',
      ),
    ).toStrictEqual([]);
  });

  it('if getAllDataAtomicsWithNameInData returns dataAtomic, should return their string value in an array', () => {
    mockGetAllDataAtomicsWithNameInData.mockReturnValueOnce([
      { name: 'someName', value: 'firstMatch' },
      { name: 'someName', value: 'secondMatch' },
      { name: 'someName', value: 'thirdMatch' },
    ]);
    expect(
      getAllDataAtomicValuesWithNameInData(
        dataGroupWithEmptyChildren,
        'someOtherChildName',
      ),
    ).toStrictEqual(['firstMatch', 'secondMatch', 'thirdMatch']);
  });
});

describe('extractDataGroupFollowingNameInDatas', () => {
  it('if dataGroup has no children, return undefined', () => {
    expect(
      extractDataGroupFollowingNameInDatas(someEmptyDataGroup, [
        'someNameInData',
      ]),
    ).toBeUndefined();
  });

  it('passes the first of nameInDatas to getFirstDataGroupWithNameInData', () => {
    extractDataGroupFollowingNameInDatas(someNonEmptyDataGroup, [
      'someInterestingChildDataGroup',
    ]);

    expect(mockGetFirstDataGroupWithNameInData).toHaveBeenNthCalledWith(
      1,
      expect.any(Object),
      'someInterestingChildDataGroup',
    );

    extractDataGroupFollowingNameInDatas(someNonEmptyDataGroup, [
      'someOtherInterestingChildDataGroup',
    ]);

    expect(mockGetFirstDataGroupWithNameInData).toHaveBeenNthCalledWith(
      2,
      expect.any(Object),
      'someOtherInterestingChildDataGroup',
    );
  });

  it('passes the dataGroup to getFirstDataGroupWithNameInData', () => {
    extractDataGroupFollowingNameInDatas(someNonEmptyDataGroup, ['someFoo']);

    expect(mockGetFirstDataGroupWithNameInData).toHaveBeenNthCalledWith(
      1,
      someNonEmptyDataGroup,
      expect.any(String),
    );

    extractDataGroupFollowingNameInDatas(someTwoLevelDataGroup, ['someFoo']);

    expect(mockGetFirstDataGroupWithNameInData).toHaveBeenNthCalledWith(
      2,
      someTwoLevelDataGroup,
      expect.any(String),
    );
  });
});

describe('extractFirstDataGroupWithAttributesFollowingNameInDatas', () => {
  it('if nameInDatas.length=== 0, return undefined', () => {
    expect(
      extractFirstDataGroupWithAttributesFollowingNameInDatas(
        someNonEmptyDataGroup,
        [],
      ),
    ).toBeUndefined();
  });

  it('if dataGroup has no children, return undefined', () => {
    expect(
      extractFirstDataGroupWithAttributesFollowingNameInDatas(
        someEmptyDataGroup,
        ['someNameInData'],
      ),
    ).toBeUndefined();
  });

  describe('if there are at least 2 nameInDatas', () => {
    it('if extractDataGroupFollowingNameInDatas returns undefined, return undefined', () => {
      mockGetFirstDataGroupWithNameInData.mockImplementationOnce(() => {
        throw new Error('Some error message');
      });

      expect(() => {
        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someNonEmptyDataGroup,
          ['someInterestingChildDataGroup', 'someAtomic'],
        );
      }).toThrow(Error);

      try {
        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someNonEmptyDataGroup,
          ['someInterestingChildDataGroup', 'someAtomic'],
        );
      } catch (error: unknown) {
        const childMissingError: Error = <Error>error;
        expect(childMissingError.message).toStrictEqual('Some error message');
      }
    });

    describe('if extractDataGroupFollowingNameInDatas returns dataGroup', () => {
      it('call getFirstDataGroupWithNameInDataAndAttributes with that dataGroup', () => {
        mockGetFirstDataGroupWithNameInData.mockReturnValueOnce(
          someNestedDataGroup,
        );
        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          ['someInterestingChildDataGroup', 'someAtomic'],
        );

        expect(
          mockGetFirstDataGroupWithNameInDataAndAttributes,
        ).toHaveBeenLastCalledWith(
          someNestedDataGroup,
          expect.any(String),
          undefined,
        );

        mockGetFirstDataGroupWithNameInData.mockReturnValueOnce(
          someNonEmptyDataGroup,
        );
        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          ['someInterestingChildDataGroup', 'someAtomic'],
        );

        expect(
          mockGetFirstDataGroupWithNameInDataAndAttributes,
        ).toHaveBeenLastCalledWith(
          someNonEmptyDataGroup,
          expect.any(String),
          undefined,
        );
      });

      it('call getFirstDataGroupWithNameInDataAndAttributes with the remaining nameInData', () => {
        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          [
            'someInterestingChildDataGroup',
            'someOtherInterestingChildDataGroup',
            'someFinalDataGroup',
          ],
        );

        expect(
          mockGetFirstDataGroupWithNameInDataAndAttributes,
        ).toHaveBeenLastCalledWith(
          expect.any(Object),
          'someFinalDataGroup',
          undefined,
        );

        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          ['someInterestingChildDataGroup', 'someOtherFinalDataGroup'],
        );

        expect(
          mockGetFirstDataGroupWithNameInDataAndAttributes,
        ).toHaveBeenLastCalledWith(
          expect.any(Object),
          'someOtherFinalDataGroup',
          undefined,
        );
      });

      it('call getFirstDataGroupWithNameInDataAndAttributes with possible attributes', () => {
        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          ['someInterestingChildDataGroup', 'someFinalDataGroup'],
          {
            someAttribute: 'foo',
            someOtherAttribute: 'bar',
          },
        );

        expect(
          mockGetFirstDataGroupWithNameInDataAndAttributes,
        ).toHaveBeenLastCalledWith(expect.any(Object), expect.any(String), {
          someAttribute: 'foo',
          someOtherAttribute: 'bar',
        });

        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          ['someInterestingChildDataGroup', 'someOtherFinalDataGroup'],
          {
            bar: 'foo',
          },
        );

        expect(
          mockGetFirstDataGroupWithNameInDataAndAttributes,
        ).toHaveBeenLastCalledWith(expect.any(Object), expect.any(String), {
          bar: 'foo',
        });
      });

      it('returns whatever getFirstDataGroupWithNameInDataAndAttributes returns', () => {
        mockGetFirstDataGroupWithNameInDataAndAttributes.mockReturnValueOnce(
          someNestedDataGroup,
        );
        let returned = extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          ['someInterestingChildDataGroup', 'someAtomic'],
        );

        expect(returned).toStrictEqual(someNestedDataGroup);

        mockGetFirstDataGroupWithNameInDataAndAttributes.mockReturnValueOnce(
          someTwoLevelDataGroup,
        );
        returned = extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          ['someInterestingChildDataGroup', 'someAtomic'],
        );

        expect(returned).toStrictEqual(someTwoLevelDataGroup);
      });
    });
  });
  describe('if there is only 1 nameInData', () => {
    it('does not call getFirstDataGroupWithNameInData', () => {
      extractFirstDataGroupWithAttributesFollowingNameInDatas(
        someNonEmptyDataGroup,
        ['someInterestingChildDataGroup'],
      );

      expect(mockGetFirstDataGroupWithNameInData).not.toHaveBeenCalled();
    });

    it('calls getFirstDataGroupWithNameInDataAndAttributes', () => {
      extractFirstDataGroupWithAttributesFollowingNameInDatas(
        someTwoLevelDataGroup,
        ['someInterestingChildDataGroup'],
        {
          someAttribute: 'foo',
        },
      );

      expect(
        mockGetFirstDataGroupWithNameInDataAndAttributes,
      ).toHaveBeenCalledWith(
        someTwoLevelDataGroup,
        'someInterestingChildDataGroup',
        {
          someAttribute: 'foo',
        },
      );
    });

    it('returns whatever getFirstDataGroupWithNameInDataAndAttributes returns', () => {
      mockGetFirstDataGroupWithNameInDataAndAttributes.mockReturnValueOnce(
        someTwoLevelDataGroup,
      );

      expect(
        extractFirstDataGroupWithAttributesFollowingNameInDatas(
          someTwoLevelDataGroup,
          ['someInterestingChildDataGroup'],
        ),
      ).toStrictEqual(someTwoLevelDataGroup);
    });
  });
});
