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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { cleanFormData } from '@/utils/cleanFormData';
import { describe, expect, it } from 'vitest';

describe('removeEmpty', () => {
  it('clear objects', () => {
    const testObject = {
      property1: null,
      property2: undefined,
      property3: '',
      property4: [],
      property5: {},
      property6: [{ value: '' }, { value: '' }],
      property7: {
        value: '',
        testGroup: { value: '' },
        testArray: [{}, { value: '' }],
      },
      property8: [
        {
          value: null,
        },
      ],
      property9: {
        value: '',
        _colour: 'blue',
      },
      property10: {
        value: '',
        _language: 'swe',
      },
    };
    const actual = cleanFormData(testObject);
    const expected = {};
    expect(actual).toStrictEqual(expected);
  });
  it("don't clear objects that has values", () => {
    const testObject = {
      property1: {
        value: '',
        _colour1: 'blue',
      },
      property2: {
        value: '',
        _colour2: 'green',
        _language2: 'swe',
      },
      property3: {
        value: 'someValueText',
        _language3: 'cat',
      },
      property4: {
        value: 'someValueText2',
        _language4: 'jpn',
        _colour4: 'red',
      },
      property5: {
        value: null,
        _colour5: 'yellow',
      },
      property6: {
        _language6: 'ger',
        mainTitle: {
          value: 'someMainTitle6',
        },
      },
      property7: {
        mainTitle: {
          _language7: 'nor',
          value: 'someMainTitle7',
        },
      },
    };
    const actual = cleanFormData(testObject);
    const expected = {
      property3: {
        value: 'someValueText',
        _language3: 'cat',
      },
      property4: {
        value: 'someValueText2',
        _language4: 'jpn',
        _colour4: 'red',
      },
      property6: {
        _language6: 'ger',
        mainTitle: {
          value: 'someMainTitle6',
        },
      },
      property7: {
        mainTitle: {
          _language7: 'nor',
          value: 'someMainTitle7',
        },
      },
    };
    expect(actual).toStrictEqual(expected);
  });
  it('clears mixed objects', () => {
    const testObject = {
      divaOutput: {
        abstract: [],
        administrativeNote: [
          {
            value: null,
          },
        ],
        alternativeTitle: [],
        archiveNumber: [
          {
            value: null,
          },
        ],
        artisticWork: {
          value: 'divaYes',
        },
        attachment: [],
        contentType: {
          value: 'OtherAcademic',
        },
        contributor: {
          author: [
            {
              birthYear: [
                {
                  value: null,
                },
              ],
              correspondingAuthor: [
                {
                  value: null,
                },
              ],
              deathYear: [
                {
                  value: null,
                },
              ],
              divaPerson: [
                {
                  value: null,
                },
              ],
              email: [
                {
                  value: null,
                },
              ],
              familyName: {
                value: 'Efternamn',
              },
              givenName: {
                value: 'Förnamn',
              },
              localUserId: [
                {
                  value: null,
                },
              ],
              ORCID: [
                {
                  value: null,
                },
              ],
              organisation: [
                {
                  value: null,
                },
              ],
              otherOrganisation: [],
              otherResearchGroup: [],
              researchGroup: [
                {
                  value: null,
                },
              ],
            },
          ],
        },
        externalNote: [
          {
            value: null,
          },
        ],
        funders: [],
        geoData: [
          {
            description: [
              {
                value: null,
              },
            ],
            endDate: [
              {
                day: [
                  {
                    value: null,
                  },
                ],
                month: [
                  {
                    value: null,
                  },
                ],
                year: [
                  {
                    value: null,
                  },
                ],
              },
            ],
            polygon: [],
            startDate: [
              {
                day: [
                  {
                    value: null,
                  },
                ],
                month: [
                  {
                    value: null,
                  },
                ],
                year: [
                  {
                    value: null,
                  },
                ],
              },
            ],
          },
        ],
        keywords: [],
        localId: [
          {
            value: null,
          },
        ],
        nationalSubjectCategory: [
          {
            value: 'nationalSubjectCategory:1111111111111111',
          },
        ],
        numberOfContributors: [
          {
            value: null,
          },
        ],
        otherFunder: [],
        otherProject: [],
        project: [],
        researchSubject: [],
        title: {
          _language: 'lan',
          mainTitle: {
            value: 'language',
          },
          subTitle: [
            {
              value: null,
            },
          ],
        },
        url: [],
      },
    };
    const actual = cleanFormData(testObject);
    const expected = {
      divaOutput: {
        artisticWork: {
          value: 'divaYes',
        },
        contentType: {
          value: 'OtherAcademic',
        },
        contributor: {
          author: [
            {
              familyName: {
                value: 'Efternamn',
              },
              givenName: {
                value: 'Förnamn',
              },
            },
          ],
        },
        nationalSubjectCategory: [
          {
            value: 'nationalSubjectCategory:1111111111111111',
          },
        ],
        title: {
          _language: 'lan',
          mainTitle: {
            value: 'language',
          },
        },
      },
    };
    expect(actual).toStrictEqual(expected);
  });
  it('clears other 3 mixed objects', () => {
    const testObject = {
      latitude: { value: '' },
      longitude: { value: '' },
    };
    const actual = cleanFormData(testObject);

    expect(actual).toEqual({});
  });

  it('clears empty attributes', () => {
    const testObject = {
      _type: 'personal',
      namePart_type_family: {
        _type: 'family',
        value: null,
      },
      namePart_type_given: {
        _type: 'given',
        value: null,
      },
    };
    expect(cleanFormData(testObject)).toEqual({});
  });

  it('does not clear attribute when values exist', () => {
    const testObject = {
      _type: 'personal',
      namePart_type_family: {
        _type: 'family',
        value: null,
      },
      namePart_type_given: {
        _type: 'given',
        value: 'Leo',
      },
    };

    expect(cleanFormData(testObject)).toEqual({
      _type: 'personal',
      namePart_type_given: {
        _type: 'given',
        value: 'Leo',
      },
    });
  });

  it('clears attributes without value', () => {
    const testObject = {
      output: {
        identifier_type_openAlex: [
          {
            value: null,
            _type: 'openAlex',
          },
        ],
      },
    };

    expect(cleanFormData(testObject)).toStrictEqual({});
  });

  it('clears object with attribute and empty array', () => {
    const testObject = {
      output: {
        name_type_corporate: [
          {
            _type: 'corporate',
            organisation: [],
          },
        ],
      },
    };

    expect(cleanFormData(testObject)).toEqual({});
  });

  it('clears objects with only repeatId', () => {
    const testObject = {
      root: [
        {
          repeatId: '1',
          child: [
            { repeatId: '1', value: 'value1' },
            { repeatId: '2', value: '' },
          ],
        },
      ],
    };

    expect(cleanFormData(testObject)).toEqual({
      root: [
        {
          child: [{ value: 'value1' }],
        },
      ],
    });
  });

  it('clears objects with only finalValue', () => {
    const testObject = {
      root: {
        repeatId: '1',
        child: {
          value: 'someFinalValue',
          final: true,
        },
        groupWithOnlyFinal: {
          nestedFinalValue: {
            value: 'someNestedFinalValue',
            final: true,
          },
          nestedEmpty: {
            value: '',
          },
        },
        groupWithFinalValueAndAttribute: {
          final: {
            value: 'finalNextToAttr',
            final: true,
          },
          _attribute: 'someAttr',
        },
        groupWithVarAndFinalValueAndAttribute: {
          final: {
            value: 'varWithFinalNextToAttr',
            final: true,
            _attribute: 'someOtherAttr',
          },
        },
        groupWithFinalAndValuable: {
          nestedFinalValue: {
            value: 'someNestedFinalValue',
            final: true,
          },
          nestedValuable: {
            value: 'someValuableValue',
          },
        },
      },
    };

    expect(cleanFormData(testObject)).toEqual({
      root: {
        child: {
          value: 'someFinalValue',
        },
        groupWithFinalAndValuable: {
          nestedFinalValue: {
            value: 'someNestedFinalValue',
          },
          nestedValuable: {
            value: 'someValuableValue',
          },
        },
      },
    });
  });
});
