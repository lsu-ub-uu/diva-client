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

describe('cleanFormData', () => {
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

  it('does not clear groups with final values that are from storage', () => {
    const testObject = {
      root: {
        repeatId: '1',
        child: {
          value: 'someFinalValue',
          final: true,
        },
        groupWithOnlyFinal: {
          fromStorage: true,
          nestedFinalValue: {
            value: 'someNestedFinalValue',
            final: true,
          },
          nestedEmpty: {
            value: '',
          },
        },
        groupWithFinalValueAndAttribute: {
          fromStorage: true,
          final: {
            value: 'finalNextToAttr',
            final: true,
          },
          _attribute: 'someAttr',
        },
        groupWithVarAndFinalValueAndAttribute: {
          fromStorage: true,
          final: {
            value: 'varWithFinalNextToAttr',
            final: true,
            _attribute: 'someOtherAttr',
          },
        },
        groupWithFinalAndValuable: {
          fromStorage: true,
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
        groupWithOnlyFinal: {
          nestedFinalValue: {
            value: 'someNestedFinalValue',
          },
        },
        groupWithFinalValueAndAttribute: {
          final: {
            value: 'finalNextToAttr',
          },
          _attribute: 'someAttr',
        },
        groupWithVarAndFinalValueAndAttribute: {
          final: {
            value: 'varWithFinalNextToAttr',
            _attribute: 'someOtherAttr',
          },
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

  it('does not clear group with only final values that is required', () => {
    const testObject = {
      root: {
        repeatId: '1',
        child: {
          value: 'someFinalValue',
          final: true,
        },
        groupWithOnlyFinal: {
          required: true,
          nestedFinalValue: {
            value: 'someNestedFinalValue',
            final: true,
          },
          nestedEmpty: {
            value: '',
          },
        },
        otherGroup: {
          otherSubGroup: {
            required: true,
            emptyVar: { value: '' },
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
        groupWithOnlyFinal: {
          nestedFinalValue: {
            value: 'someNestedFinalValue',
          },
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

  it('does not clear final value in array', () => {
    const testObject = {
      root: {
        required: true,
        repeatId: '1',
        someOtherChild: { value: 'test' },
        child: [
          {
            value: 'someFinalValue',
            final: true,
          },
        ],
      },
    };

    expect(cleanFormData(testObject)).toEqual({
      root: {
        someOtherChild: { value: 'test' },
        child: [
          {
            value: 'someFinalValue',
          },
        ],
      },
    });
  });

  it('transforms a minimal person record', () => {
    const testObject = {
      person: {
        recordInfo: {
          oldId: {
            value: null,
          },
          validationType: {
            value: 'diva-person',
            final: true,
          },
          dataDivider: {
            value: 'divaData',
            final: true,
          },
          required: true,
        },
        affiliation: [
          {
            endDate: {
              day: {
                value: null,
              },
              month: {
                value: null,
              },
              year: {
                value: null,
              },
            },
            startDate: {
              day: {
                value: null,
              },
              month: {
                value: null,
              },
              year: {
                value: null,
              },
            },
            organisation: {
              value: null,
            },
            repeatId: '1761568426168',
            name_type_corporate: {
              namePart: {
                value: '',
              },
              _type: 'corporate',
            },
            identifier_type_ror: {
              value: '',
              _type: 'ror',
            },
            country: {
              value: '',
            },
            description: {
              value: '',
            },
          },
        ],
        nameIdentifier_type_viaf: [
          {
            _type: 'viaf',
            value: null,
            repeatId: '1761568426168',
          },
        ],
        nameIdentifier_type_scopus: [
          {
            _type: 'scopus',
            value: null,
            repeatId: '1761568426168',
          },
        ],
        nameIdentifier_type_openAlex: [
          {
            _type: 'openAlex',
            value: null,
            repeatId: '1761568426168',
          },
        ],
        'nameIentifier_type_se-libr': [
          {
            _type: 'se-libr',
            value: null,
            repeatId: '1761568426167',
          },
        ],
        nameIdentifier_type_localId: [
          {
            _type: 'localId',
            value: null,
            repeatId: '1761568426167',
          },
        ],
        nameIdentifier_type_orcid: [
          {
            _type: 'orcid',
            value: null,
            repeatId: '1761568426167',
          },
        ],
        location: [
          {
            displayLabel: {
              value: null,
            },
            url: {
              value: null,
            },
            repeatId: '1761568426167',
          },
        ],
        note_type_biographical: [
          {
            _lang: '',
            _type: 'biographical',
            value: null,
            repeatId: '1761568426167',
          },
        ],
        email: [
          {
            value: null,
            repeatId: '1761568426167',
          },
        ],
        personInfo: {
          deathDate: {
            day: {},
            month: {},
            year: {},
          },
          birthDate: {
            day: {
              value: null,
            },
            month: {
              value: null,
            },
            year: {
              value: null,
            },
          },
        },
        variant: {
          name_type_personal: [
            {
              _type: 'personal',
              namePart_type_given: {
                _type: 'given',
                value: null,
              },
              namePart_type_family: {
                _type: 'family',
                value: null,
              },
              required: true,
              repeatId: '1761568426167',
            },
          ],
        },
        authority: {
          name_type_personal: {
            _type: 'personal',
            namePart_type_termsOfAddress: {
              _type: 'termsOfAddress',
              value: null,
            },
            namePart_type_given: {
              _type: 'given',
              value: null,
            },
            namePart_type_family: {
              value: 'asdsad',
              _type: 'family',
            },
            required: true,
          },
          required: true,
        },
        required: true,
      },
    };

    expect(cleanFormData(testObject)).toEqual({
      person: {
        recordInfo: {
          validationType: {
            value: 'diva-person',
          },
          dataDivider: {
            value: 'divaData',
          },
        },
        authority: {
          name_type_personal: {
            _type: 'personal',
            namePart_type_family: {
              value: 'asdsad',
              _type: 'family',
            },
          },
        },
      },
    });
  });

  it('handles resource link', () => {
    const testObject = {
      thumbnail: {
        resourceId: {
          value:
            '/tmp/sharedFileStorage/diva/streams/divaData/04e/ebf/b12/04eebfb120d94b5494fbba240e38f8c8e1364b59d01564ccf1b930825a4a00b2/binary:binary:21859605549853681-thumbnail',
        },
        fileSize: {
          value: '6564',
        },
        mimeType: {
          value: 'image/jpeg',
        },
        height: {
          value: '145',
        },
        width: {
          value: '100',
        },
        thumbnail: {
          name: 'thumbnail',
          mimeType: 'image/jpeg',
          id: 'binary:21859605549853681',
        },
      },
    };

    expect(cleanFormData(testObject)).toStrictEqual(testObject);
  });
});
