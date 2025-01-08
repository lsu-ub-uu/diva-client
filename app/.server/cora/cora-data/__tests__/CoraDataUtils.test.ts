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

import * as cdu from '../CoraDataUtils';
import {
  getAllDataAtomicValueFromDataGroup,
  hasChildWithNameInData,
} from '../CoraDataUtils';
import type { DataAtomic, DataElement, DataGroup } from '../CoraData';
import { describe, expect } from 'vitest';

const dataGroupWithOneRecordLink: DataGroup = {
  name: 'someDataGroupName',
  children: [
    {
      name: 'someName',
      repeatId: '1',
      children: [
        {
          name: 'linkedRecordType',
          value: 'someRecordType',
        },
        {
          name: 'linkedRecordId',
          value: 'someId',
        },
      ],
      actionLinks: {
        read: {
          requestMethod: 'GET',
          rel: 'read',
          url: 'http://localhost:38082/diva/rest/record/someRecordType/someId',
          accept: 'application/vnd.uub.record+json',
        },
      },
    },
  ],
};

const dataGroupWithEmptyChildren: DataGroup = {
  name: 'someName',
  children: [],
};

const dataGroupWithNonMatchingDataElements: DataGroup = {
  name: 'someName',
  children: [
    {
      name: 'someUninterestingChildName',
      value: 'someValue',
    },
    {
      name: 'someOtherUninterestingChildName',
      value: 'someValue',
    },
    {
      name: 'someUninterestingChildName',
      children: [
        {
          name: 'someOtherUninterestingChildName',
          value: 'someValue',
        },
      ],
    },
  ],
};

const dataGroupWithOnlyMatchingAtomics: DataGroup = {
  name: 'someName',
  children: [
    {
      name: 'someInterestingChildName',
      value: 'someValue',
    },
    {
      name: 'someInterestingChildName',
      value: 'someOtherValue',
    },
    {
      name: 'someUninterestingChildName',
      children: [
        {
          name: 'someOtherUninterestingChildName',
          value: 'someValue',
        },
      ],
    },
  ],
};

const dataGroupWithOnlyMatchingGroups: DataGroup = {
  name: 'someName',
  children: [
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherUninterestingChildName',
          value: 'someValue',
        },
      ],
    },
    {
      name: 'someOtherUninterestingChildName',
      value: 'someValue',
    },
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherUninterestingChildName',
          value: 'someValue',
        },
      ],
    },
  ],
};

const dataGroupWithOneMatchingAtomicAndOneMatchingGroup: DataGroup = {
  name: 'someName',
  children: [
    {
      name: 'someUninterestingChildName',
      value: 'someValue',
    },
    {
      name: 'someOtherUninterestingChildName',
      value: 'someValue',
    },
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherChild',
          value: 'someValue',
        },
      ],
    },
    {
      name: 'someInterestingChildName',
      value: 'someValue',
    },
  ],
};

const dataGroupWithSeveralMatchingDataGroups: DataGroup = {
  name: 'someName',
  children: [
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'firstChild',
          value: 'someValue',
        },
      ],
    },
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'secondChild',
          value: 'someValue',
        },
      ],
    },
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'thirdChild',
          value: 'someValue',
        },
      ],
    },
  ],
};
const dataGroupWithSeveralMatchingAtomics: DataGroup = {
  name: 'someName',
  children: [
    {
      name: 'someInterestingChildName',
      value: 'firstMatch',
    },
    {
      name: 'someInterestingChildName',
      value: 'second',
    },
    {
      name: 'someInterestingChildName',
      value: 'third',
    },
  ],
};

describe('getAllRecordLinksWithNameInData', () => {
  it('should return empty list if there are no children', () => {
    const children = cdu.getAllRecordLinksWithNameInData(
      dataGroupWithEmptyChildren,
      'someChildName',
    );

    expect(children).toStrictEqual([]);
    expect(children).toHaveLength(0);
  });

  it('should return empty list if no record links exist with correct name', () => {
    const children = cdu.getAllRecordLinksWithNameInData(
      dataGroupWithOneRecordLink,
      'NOTsomeChildName',
    );

    expect(children).toStrictEqual([]);
    expect(children).toHaveLength(0);
  });

  it('should return empty list if dataAtomic exist with correct name but wrong type', () => {
    const children = cdu.getAllRecordLinksWithNameInData(
      dataGroupWithSeveralMatchingAtomics,
      'someInterestingChildName',
    );

    expect(children).toStrictEqual([]);
    expect(children).toHaveLength(0);
  });

  it('should return empty list if dataGroup exist with correct name but wrong type', () => {
    const children = cdu.getAllRecordLinksWithNameInData(
      dataGroupWithOnlyMatchingAtomics,
      'someInterestingChildName',
    );

    expect(children).toStrictEqual([]);
    expect(children).toHaveLength(0);
  });

  it('should return a list with correct recordLink if exist with correct name', () => {
    const children = cdu.getAllRecordLinksWithNameInData(
      dataGroupWithOneRecordLink,
      'someName',
    );

    expect(children).toStrictEqual([
      {
        name: 'someName',
        recordType: 'someRecordType',
        id: 'someId',
        readLink: {
          requestMethod: 'GET',
          rel: 'read',
          url: 'http://localhost:38082/diva/rest/record/someRecordType/someId',
          accept: 'application/vnd.uub.record+json',
        },
      },
    ]);
    expect(children).toHaveLength(1);
  });
});

describe('getFirstRecordLinkWithNameInData', () => {
  it('should throw with no recordLink', () => {
    expect(() => {
      cdu.getFirstRecordLinkWithNameInData(
        dataGroupWithOneRecordLink,
        'someName',
      );
    }).toThrow(Error);

    try {
      cdu.getFirstRecordLinkWithNameInData(
        dataGroupWithOneRecordLink,
        'someName',
      );
    } catch (error: unknown) {
      const childMissingError: Error = <Error>error;
      expect(childMissingError.message).toStrictEqual(
        'RecordLink with name [someName] does not exist',
      );
    }
  });
  it('', () => {});
});

describe('getAllChildrenWithNameInData', () => {
  it('should return empty list if there are no children', () => {
    const children = cdu.getAllChildrenWithNameInData(
      dataGroupWithEmptyChildren,
      'someChildName',
    );

    expect(children).toStrictEqual([]);
    expect(children).toHaveLength(0);
  });

  it('should return empty list if no child with given name in data exists', () => {
    const dataGroupWithNonMatchingChildren: DataGroup = {
      name: 'someName',
      children: [
        {
          name: 'someUninterestingName',
          value: 'someValue',
        },
        {
          name: 'someOtherUninterestingName',
          value: 'someOtherValue',
        },
      ],
    };

    const children = cdu.getAllChildrenWithNameInData(
      dataGroupWithNonMatchingChildren,
      'someChildName',
    );

    expect(children).toStrictEqual([]);
    expect(children).toHaveLength(0);
  });

  it('should return a list containing all dataElements with given name in data', () => {
    const dataGroupWithSomeMatchingChildren: DataGroup = {
      name: 'someName',
      children: [
        {
          name: 'someUninterestingName',
          value: 'someValue',
        },
        {
          name: 'someInterestingName',
          value: 'someInterestingValue',
        },
        {
          name: 'someOtherUninterestingName',
          value: 'someOtherValue',
        },
        {
          name: 'someInterestingName',
          value: 'someOtherInterestingValue',
        },
        {
          name: 'someInterestingName',
          value: 'someOther2InterestingValue',
        },
      ],
    };

    const children = cdu.getAllChildrenWithNameInData(
      dataGroupWithSomeMatchingChildren,
      'someInterestingName',
    );

    expect(children).toStrictEqual([
      {
        name: 'someInterestingName',
        value: 'someInterestingValue',
      },
      {
        name: 'someInterestingName',
        value: 'someOtherInterestingValue',
      },
      {
        name: 'someInterestingName',
        value: 'someOther2InterestingValue',
      },
    ]);
    expect(children).toHaveLength(3);
  });

  it('should not return dataElements with non-matching name in data', () => {
    const dataGroupWithSomeMatchingChildren: DataGroup = {
      name: 'someName',
      children: [
        {
          name: 'someUninterestingName',
          value: 'someValue',
        },
        {
          name: 'someInterestingName',
          value: 'someInterestingValue',
        },
        {
          name: 'someOtherUninterestingName',
          value: 'someOtherValue',
        },
        {
          name: 'someInterestingName',
          value: 'someOtherInterestingValue',
        },
        {
          name: 'someInterestingName',
          value: 'someOther2InterestingValue',
        },
      ],
    };

    const children = cdu.getAllChildrenWithNameInData(
      dataGroupWithSomeMatchingChildren,
      'someInterestingName',
    );

    expect(children).not.toContain({
      name: 'someUninterestingName',
      value: 'someValue',
    });
    expect(children).not.toContain({
      name: 'someOtherUninterestingName',
      value: 'someOtherValue',
    });
  });
});

describe('getFirstChildWithNameInData', () => {
  it('should return null if no child exists', () => {
    expect(() => {
      cdu.getFirstChildWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    }).toThrow(Error);

    try {
      cdu.getFirstChildWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    } catch (error: unknown) {
      const attributeError: Error = <Error>error;
      expect(attributeError.message).toStrictEqual(
        'DataGroup with name [someName] does not have any children',
      );
    }
  });

  it('should return null if no matching child exists', () => {
    expect(() => {
      cdu.getFirstChildWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    }).toThrow(Error);

    try {
      cdu.getFirstChildWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    } catch (error: unknown) {
      const attributeError: Error = <Error>error;
      expect(attributeError.message).toStrictEqual(
        'DataGroup with name [someName] does not have any children',
      );
    }

    expect(() => {
      cdu.getFirstChildWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    }).toThrow(Error);

    try {
      cdu.getFirstChildWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    } catch (error: unknown) {
      const attributeError: Error = <Error>error;
      expect(attributeError.message).toStrictEqual(
        'DataGroup with name [someName] does not have any children',
      );
    }
  });

  it('Should return a child with matching name in data if provided with one matching child', () => {
    const dataGroupWithOneMatchingChild: DataGroup = {
      name: 'someName',
      children: [
        {
          name: 'someChildName',
          value: 'someValue',
        },
      ],
    };

    const child: DataAtomic = <DataAtomic>(
      cdu.getFirstChildWithNameInData(
        dataGroupWithOneMatchingChild,
        'someChildName',
      )
    );
    expect(child).not.toBe(undefined);
    expect(child.name).toBe('someChildName');
  });

  it('Should return a child with matching name in data if provided with one matching child and one additional', () => {
    const dataGroupWithOneMatchingAndOneOtherChild: DataGroup = {
      name: 'someName',
      children: [
        {
          name: 'someChildName',
          value: 'someValue',
        },
        {
          name: 'someOtherChildName',
          value: 'someValue',
        },
      ],
    };

    const child2 = <DataElement>(
      cdu.getFirstChildWithNameInData(
        dataGroupWithOneMatchingAndOneOtherChild,
        'someOtherChildName',
      )
    );

    expect(child2).not.toBe(undefined);
    expect(child2.name).toBe('someOtherChildName');
  });

  it('Should return the first child with matching name in data', () => {
    const dataGroupWithMultipleMatchingChildren: DataGroup = {
      name: 'someName',
      children: [
        {
          name: 'someOtherChildName',
          children: [
            {
              name: 'someGrandChildName',
              value: 'someValue',
            },
          ],
        },
        {
          name: 'someChildName',
          value: 'someValue',
        },
        {
          name: 'someChildName',
          children: [
            {
              name: 'anotherGrandChildName',
              value: 'someValue',
            },
          ],
        },
      ],
    };

    const child: DataAtomic = <DataAtomic>(
      cdu.getFirstChildWithNameInData(
        dataGroupWithMultipleMatchingChildren,
        'someChildName',
      )
    );
    expect(child).not.toBe(undefined);
    expect(child.name).toBe('someChildName');
    expect(child.value).toBe('someValue');
  });
});

describe('containsChildWithNameInData', () => {
  it('returns false if child does not exist', () => {
    expect(
      cdu.containsChildWithNameInData(
        dataGroupWithSeveralMatchingAtomics,
        'someNameInDataForFalse',
      ),
    ).toBe(false);
  });
  it('returns true if child does exist', () => {
    expect(
      cdu.containsChildWithNameInData(
        dataGroupWithSeveralMatchingAtomics,
        'someInterestingChildName',
      ),
    ).toBe(true);
  });
});

describe('getFirstDataAtomicWithNameInData', () => {
  it('if dataGroup has no children, should throw an error', () => {
    expect(() => {
      cdu.getFirstDataAtomicWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    }).toThrow(Error);

    try {
      cdu.getFirstDataAtomicWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    } catch (error: unknown) {
      const attributeError: Error = <Error>error;
      expect(attributeError.message).toStrictEqual(
        'DataGroup with name [someName] does not have any children',
      );
    }
  });

  it('if dataGroup has no matching child, should throw error', () => {
    expect(() => {
      cdu.getFirstDataAtomicWithNameInData(
        dataGroupWithNonMatchingDataElements,
        'someChildName',
      );
    }).toThrow(Error);
    try {
      cdu.getFirstDataAtomicWithNameInData(
        dataGroupWithNonMatchingDataElements,
        'someChildName',
      );
    } catch (error: unknown) {
      const attributeError: Error = <Error>error;
      expect(attributeError.message).toStrictEqual(
        'DataGroup with name [someName] does not have atomic child with name [someChildName]',
      );
    }
  });

  it('if dataGroup has matching DataAtomic, should return that DataAtomic', () => {
    expect(
      cdu.getFirstDataAtomicWithNameInData(
        dataGroupWithOneMatchingAtomicAndOneMatchingGroup,
        'someInterestingChildName',
      ),
    ).toStrictEqual({
      name: 'someInterestingChildName',
      value: 'someValue',
    });
  });

  it('if dataGroup has several matching DataAtomics, should return the first of them', () => {
    expect(
      cdu.getFirstDataAtomicWithNameInData(
        dataGroupWithSeveralMatchingAtomics,
        'someInterestingChildName',
      ),
    ).toStrictEqual({
      name: 'someInterestingChildName',
      value: 'firstMatch',
    });
  });
});

describe('getAllDataAtomicsWithNameInData', () => {
  it('if dataGroup has no children, should return empty array', () => {
    expect(
      cdu.getAllDataAtomicsWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      ),
    ).toStrictEqual([]);
  });

  it('if dataGroup has no matching children, should return empty array', () => {
    expect(
      cdu.getAllDataAtomicsWithNameInData(
        dataGroupWithNonMatchingDataElements,
        'someChildName',
      ),
    ).toStrictEqual([]);
  });

  it('if dataGroup has no matching DataAtomic, should return empty array', () => {
    expect(
      cdu.getAllDataAtomicsWithNameInData(
        dataGroupWithOnlyMatchingGroups,
        'someInterestingChildName',
      ),
    ).toStrictEqual([]);
  });

  it('if dataGroup has matching DataAtomic, should return array containing that DataAtomic', () => {
    expect(
      cdu.getAllDataAtomicsWithNameInData(
        dataGroupWithOneMatchingAtomicAndOneMatchingGroup,
        'someInterestingChildName',
      ),
    ).toStrictEqual([{ name: 'someInterestingChildName', value: 'someValue' }]);
  });

  it('if dataGroup has several matching DataAtomic, should return array containing all the matching DataAtomics', () => {
    expect(
      cdu.getAllDataAtomicsWithNameInData(
        dataGroupWithSeveralMatchingAtomics,
        'someInterestingChildName',
      ),
    ).toStrictEqual([
      { name: 'someInterestingChildName', value: 'firstMatch' },
      { name: 'someInterestingChildName', value: 'second' },
      { name: 'someInterestingChildName', value: 'third' },
    ]);
  });
});

describe('getFirstDataGroupWithNameInData', () => {
  it('should throw Error with no children', () => {
    expect(() => {
      cdu.getFirstDataGroupWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    }).toThrow(Error);

    try {
      cdu.getFirstDataGroupWithNameInData(
        dataGroupWithEmptyChildren,
        'someChildName',
      );
    } catch (error: unknown) {
      const childMissingError: Error = <Error>error;
      expect(childMissingError.message).toStrictEqual(
        'Child with name [someChildName] does not exist',
      );
    }
  });

  it('if dataGroup has matching DataGroup, should return that DataGroup', () => {
    expect(
      cdu.getFirstDataGroupWithNameInData(
        dataGroupWithOneMatchingAtomicAndOneMatchingGroup,
        'someInterestingChildName',
      ),
    ).toStrictEqual({
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherChild',
          value: 'someValue',
        },
      ],
    });
  });

  it('if dataGroup has several matching DataGroups, should return the first of them', () => {
    expect(
      cdu.getFirstDataGroupWithNameInData(
        dataGroupWithSeveralMatchingDataGroups,
        'someInterestingChildName',
      ),
    ).toStrictEqual({
      name: 'someInterestingChildName',
      children: [
        {
          name: 'firstChild',
          value: 'someValue',
        },
      ],
    });
  });
});

const dataGroupWithNonMatchingAttributes: DataGroup = {
  name: 'someName',
  children: [
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherUninterestingChildName',
          value: 'someValue',
        },
      ],
      attributes: {
        someUninterestingKey: 'someUninterestingValue',
      },
    },
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherUninterestingChildName',
          value: 'someValue',
        },
      ],
      attributes: {
        someOtherUninterestingKey: 'someOtherUninterestingValue',
      },
    },
  ],
};

const dataGroupWithOneMatchingAtomicAndOneMatchingGroupWithAttributes: DataGroup =
  {
    name: 'someName',
    children: [
      {
        name: 'someUninterestingChildName',
        value: 'someValue',
      },
      {
        name: 'someOtherUninterestingChildName',
        value: 'someValue',
      },
      {
        name: 'someInterestingChildName',
        children: [
          {
            name: 'someOtherChild',
            value: 'someValue',
          },
        ],
      },
      {
        name: 'someInterestingChildName',
        children: [
          {
            name: 'someOtherChild',
            value: 'someValue',
          },
        ],
        attributes: {
          someUninterestingKey: 'someUninterestingValue',
        },
      },
      {
        name: 'someInterestingChildName',
        children: [
          {
            name: 'someOtherChild',
            value: 'someValue',
          },
        ],
        attributes: {
          someInterestingKey: 'someInterestingValue',
        },
      },
      {
        name: 'someInterestingChildName',
        value: 'someValue',
      },
    ],
  };
const dataGroupWithMultipleMatchingGroupWithAttributes: DataGroup = {
  name: 'someName',
  children: [
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherChild',
          value: 'someValue',
        },
      ],
    },
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'childOfTheFirstMatchingDataGroup',
          value: 'someValue',
        },
      ],
      attributes: {
        someInterestingKey: 'someInterestingValue',
      },
    },
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherChild',
          value: 'someValue',
        },
      ],
      attributes: {
        someUninterestingKey: 'someUninterestingValue',
      },
    },
    {
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherChild',
          value: 'someValue',
        },
      ],
      attributes: {
        someInterestingKey: 'someInterestingValue',
      },
    },
    {
      name: 'someInterestingChildName',
      value: 'someValue',
    },
  ],
};

describe('getFirstDataGroupWithNameInDataAndAttributes', () => {
  it('if getAllDataGroupsWithNameInDataAndAttributes returns empty array, throw error', () => {
    expect(() => {
      cdu.getFirstDataGroupWithNameInDataAndAttributes(
        dataGroupWithEmptyChildren,
        'someChildName',
        { someKey: 'someValue' },
      );
    }).toThrow(Error);

    try {
      cdu.getFirstDataGroupWithNameInDataAndAttributes(
        dataGroupWithEmptyChildren,
        'someChildName',
        { someKey: 'someValue' },
      );
    } catch (error: unknown) {
      const childMissingError: Error = <Error>error;
      expect(childMissingError.message).toStrictEqual(
        'DataGroup with name [someChildName] does not exist',
      );
    }
  });

  it('if getAllDataGroupsWithNameInDataAndAttributes returns non-empty array, return first element from array', () => {
    expect(
      cdu.getFirstDataGroupWithNameInDataAndAttributes(
        dataGroupWithSeveralMatchingDataGroups,
        'someInterestingChildName',
      ),
    ).toStrictEqual({
      name: 'someInterestingChildName',
      children: [
        {
          name: 'firstChild',
          value: 'someValue',
        },
      ],
    });

    expect(
      cdu.getFirstDataGroupWithNameInDataAndAttributes(
        dataGroupWithOneMatchingAtomicAndOneMatchingGroup,
        'someInterestingChildName',
      ),
    ).toStrictEqual({
      name: 'someInterestingChildName',
      children: [
        {
          name: 'someOtherChild',
          value: 'someValue',
        },
      ],
    });
  });
});

describe('getAllDataGroupsWithNameInDataAndAttributes', () => {
  it('should take dataGroup, nameInData and AttributeMatcher', () => {
    cdu.getAllDataGroupsWithNameInDataAndAttributes(
      dataGroupWithEmptyChildren,
      'someChildName',
      {
        someKey: 'someValue',
      },
    );
  });

  it('if dataGroup has no children, should return empty array', () => {
    expect(
      cdu.getAllDataGroupsWithNameInDataAndAttributes(
        dataGroupWithEmptyChildren,
        'someChildName',
        {
          someKey: 'someValue',
        },
      ),
    ).toStrictEqual([]);
  });

  it('if dataGroup has empty nameInData, should return empty array', () => {
    expect(
      cdu.getAllDataGroupsWithNameInDataAndAttributes(
        dataGroupWithEmptyChildren,
        '',
        {
          someKey: 'someValue',
        },
      ),
    ).toStrictEqual([]);
  });

  it('if dataGroup has no matching child, should return empty array', () => {
    expect(
      cdu.getAllDataGroupsWithNameInDataAndAttributes(
        dataGroupWithNonMatchingDataElements,
        'someChildName',
        { someKey: 'someValue' },
      ),
    ).toStrictEqual([]);
  });

  it('if dataGroup has no matching DataGroup, should return empty array', () => {
    expect(
      cdu.getAllDataGroupsWithNameInDataAndAttributes(
        dataGroupWithOnlyMatchingAtomics,
        'someInterestingChildName',
        { someKey: 'someValue' },
      ),
    ).toStrictEqual([]);
  });

  it('if dataGroup has child with matching nameInData, but not attribute, should return empty array', () => {
    expect(
      cdu.getAllDataGroupsWithNameInDataAndAttributes(
        dataGroupWithNonMatchingAttributes,
        'someInterestingChildName',
        { someKey: 'someValue' },
      ),
    ).toStrictEqual([]);
  });

  it('if dataGroup has child matching both nameInData and attribute, should return array containing that DataGroup', () => {
    expect(
      cdu.getAllDataGroupsWithNameInDataAndAttributes(
        dataGroupWithOneMatchingAtomicAndOneMatchingGroupWithAttributes,
        'someInterestingChildName',
        {
          someInterestingKey: 'someInterestingValue',
        },
      ),
    ).toStrictEqual([
      {
        name: 'someInterestingChildName',
        children: [
          {
            name: 'someOtherChild',
            value: 'someValue',
          },
        ],
        attributes: {
          someInterestingKey: 'someInterestingValue',
        },
      },
    ]);
  });

  it('if dataGroup has multiple children matching both nameInData and attribute, should return all of them', () => {
    expect(
      cdu.getAllDataGroupsWithNameInDataAndAttributes(
        dataGroupWithMultipleMatchingGroupWithAttributes,
        'someInterestingChildName',
        {
          someInterestingKey: 'someInterestingValue',
        },
      ),
    ).toStrictEqual([
      {
        name: 'someInterestingChildName',
        children: [
          {
            name: 'childOfTheFirstMatchingDataGroup',
            value: 'someValue',
          },
        ],
        attributes: {
          someInterestingKey: 'someInterestingValue',
        },
      },
      {
        name: 'someInterestingChildName',
        children: [
          {
            name: 'someOtherChild',
            value: 'someValue',
          },
        ],
        attributes: {
          someInterestingKey: 'someInterestingValue',
        },
      },
    ]);
  });

  describe('with no passed attributesToMatch', () => {
    it('if dataGroup has matching DataGroup, should return array containing that DataGroup', () => {
      expect(
        cdu.getAllDataGroupsWithNameInDataAndAttributes(
          dataGroupWithOneMatchingAtomicAndOneMatchingGroup,
          'someInterestingChildName',
        ),
      ).toStrictEqual([
        {
          name: 'someInterestingChildName',
          children: [
            {
              name: 'someOtherChild',
              value: 'someValue',
            },
          ],
        },
      ]);
    });
    it('if dataGroup has several matching DataGroups, should return all of them', () => {
      expect(
        cdu.getAllDataGroupsWithNameInDataAndAttributes(
          dataGroupWithSeveralMatchingDataGroups,
          'someInterestingChildName',
        ),
      ).toStrictEqual([
        {
          name: 'someInterestingChildName',
          children: [
            {
              name: 'firstChild',
              value: 'someValue',
            },
          ],
        },
        {
          name: 'someInterestingChildName',
          children: [
            {
              name: 'secondChild',
              value: 'someValue',
            },
          ],
        },
        {
          name: 'someInterestingChildName',
          children: [
            {
              name: 'thirdChild',
              value: 'someValue',
            },
          ],
        },
      ]);
    });
  });
});

describe('getAllDataAtomicValueFromDataGroup', () => {
  it('should return no results', () => {
    const actual = getAllDataAtomicValueFromDataGroup(
      dataGroupWithEmptyChildren,
    );
    expect(actual).toStrictEqual({});
  });
  it('should return one key for nested groups', () => {
    const actual = getAllDataAtomicValueFromDataGroup(
      dataGroupWithOnlyMatchingGroups,
    );
    expect(actual).toStrictEqual({
      someOtherUninterestingChildName: 'someValue',
    });
  });
  it('should return one key for identical atomics', () => {
    const actual = getAllDataAtomicValueFromDataGroup(
      dataGroupWithOnlyMatchingAtomics,
    );
    expect(actual).toStrictEqual({
      someInterestingChildName: 'someOtherValue',
    });
  });
  it('should return all keys for atomics', () => {
    const actual = getAllDataAtomicValueFromDataGroup(
      dataGroupWithNonMatchingDataElements,
    );
    expect(actual).toStrictEqual({
      someOtherUninterestingChildName: 'someValue',
      someUninterestingChildName: 'someValue',
    });
  });
});

describe('hasChildWithNameInData', () => {
  it('return true if has child', () => {
    const actual = hasChildWithNameInData(
      dataGroupWithNonMatchingDataElements,
      'someUninterestingChildName',
    );
    expect(actual).toBe(true);
  });
  it('return false if does not have child', () => {
    const actual = hasChildWithNameInData(
      dataGroupWithNonMatchingDataElements,
      'someFalseUninterestingChildName',
    );
    expect(actual).toBe(false);
  });
});
