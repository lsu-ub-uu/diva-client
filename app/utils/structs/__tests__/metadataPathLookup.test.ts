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
import type { FormMetaData } from '@/data/formDefinition/formDefinition.server';
import { describe, expect, it } from 'vitest';
import {
  addAttributesToNameServer,
  addNamesToArray,
  createFormMetaDataPathLookup,
  createPath,
} from '../metadataPathLookup';

describe('createFormMetaDataPathLookup', () => {
  describe('createFormMetaDataPathLookup', () => {
    it('should return form meta data for a given validation type', () => {
      const formMetaData: FormMetaData = {
        name: 'someNewMetadataGroupNameInData',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        children: [
          {
            name: 'someNameInData',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 3,
            },
          },
          {
            name: 'someChildGroupNameInData',
            type: 'group',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            children: [
              {
                name: 'someNameInData',
                type: 'textVariable',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1,
                },
              },
            ],
          },
          {
            name: 'nationalSubjectCategory',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            type: 'recordLink',
            linkedRecordType: 'nationalSubjectCategory',
          },
        ],
      };

      const expectedMetadataLookup = {
        someNewMetadataGroupNameInData: {
          name: 'someNewMetadataGroupNameInData',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'group',
        },
        'someNewMetadataGroupNameInData.nationalSubjectCategory': {
          name: 'nationalSubjectCategory',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'recordLink',
          linkedRecordType: 'nationalSubjectCategory',
        },
        'someNewMetadataGroupNameInData.someChildGroupNameInData': {
          name: 'someChildGroupNameInData',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'group',
        },
        'someNewMetadataGroupNameInData.someChildGroupNameInData.someNameInData':
          {
            name: 'someNameInData',
            repeat: {
              repeatMax: 1,
              repeatMin: 1,
            },
            type: 'textVariable',
          },
        'someNewMetadataGroupNameInData.someNameInData': {
          name: 'someNameInData',
          repeat: {
            repeatMax: 3,
            repeatMin: 1,
          },
          type: 'textVariable',
        },
      };

      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
    });

    it('should return form meta data for a given validation type with variables with same nameInData', () => {
      const formMetaData: FormMetaData = {
        name: 'nationalSubjectCategory',
        type: 'group',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            name: 'subject',
            type: 'textVariable',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
          {
            name: 'subject',
            type: 'textVariable',
            repeat: { repeatMin: 1, repeatMax: 1 },
          },
        ],
      };

      const expectedMetadataLookup = {
        nationalSubjectCategory: {
          name: 'nationalSubjectCategory',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'group',
        },
        'nationalSubjectCategory.subject': {
          name: 'subject',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'textVariable',
        },
      };

      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
    });

    it('should return form meta data for a given validation type with variables with same nameInData 2', () => {
      const formMetaData: FormMetaData = {
        name: 'divaOutput',
        type: 'group',
        repeat: { repeatMin: 1, repeatMax: 1 },
        children: [
          {
            name: 'author',
            type: 'group',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            children: [
              {
                name: 'name',
                type: 'textVariable',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1,
                },
              },
            ],
            attributes: {
              language: 'eng',
            },
          },
          {
            name: 'author',
            type: 'group',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
            children: [
              {
                name: 'name',
                type: 'textVariable',
                repeat: {
                  repeatMin: 1,
                  repeatMax: 1,
                },
              },
            ],
            attributes: {
              language: 'swe',
            },
          },
        ],
      };

      const expectedMetadataLookup = {
        divaOutput: {
          name: 'divaOutput',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'group',
        },
        'divaOutput.author_language_eng': {
          attributes: {
            language: 'eng',
          },
          name: 'author',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'group',
        },
        'divaOutput.author_language_eng.name': {
          name: 'name',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'textVariable',
        },
        'divaOutput.author_language_swe': {
          attributes: {
            language: 'swe',
          },
          name: 'author',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'group',
        },
        'divaOutput.author_language_swe.name': {
          name: 'name',
          repeat: {
            repeatMax: 1,
            repeatMin: 1,
          },
          type: 'textVariable',
        },
      };

      const formMetaDataPathLookup = createFormMetaDataPathLookup(formMetaData);
      expect(formMetaDataPathLookup).toStrictEqual(expectedMetadataLookup);
    });
  });

  describe('addAttributesToName', () => {
    describe('formMetaData', () => {
      it('adds no attributes to name when not available', () => {
        const actual = addAttributesToNameServer({
          name: 'subject',
          type: 'textVariable',
          repeat: { repeatMin: 1, repeatMax: 1 },
        });
        expect(actual).toStrictEqual('subject');
      });

      it('adds attributes to name when available', () => {
        const actual = addAttributesToNameServer({
          name: 'subject',
          type: 'textVariable',
          repeat: { repeatMin: 1, repeatMax: 1 },
          attributes: {
            language: 'swe',
          },
        });
        expect(actual).toStrictEqual('subject_language_swe');
      });

      it('adds multiple attributes to name when available', () => {
        const actual = addAttributesToNameServer({
          name: 'subject',
          type: 'textVariable',
          repeat: { repeatMin: 1, repeatMax: 1 },
          attributes: {
            language: 'swe',
            otherLanguage: 'aak',
          },
        });
        expect(actual).toStrictEqual('subject_language_swe_otherLanguage_aak');
      });
    });
    describe('Cora MetaData', () => {
      it('adds no attributes to name when not available', () => {
        const actual = addAttributesToNameServer({
          name: 'subject',
          value: 'Naturvetenskap',
        });
        expect(actual).toStrictEqual('subject');
      });

      it('adds attributes to name when available', () => {
        const actual = addAttributesToNameServer({
          name: 'subject',
          value: 'Naturvetenskap',
          attributes: {
            language: 'swe',
          },
        });
        expect(actual).toStrictEqual('subject_language_swe');
      });

      it('adds multiple attributes to name when available', () => {
        const actual = addAttributesToNameServer({
          name: 'subject',
          value: 'Naturvetenskap',
          attributes: {
            language: 'swe',
            otherLanguage: 'aak',
          },
        });
        expect(actual).toStrictEqual('subject_language_swe_otherLanguage_aak');
      });
    });
  });

  describe('createPath', () => {
    it('creates a path for empty path', () => {
      const actual = createPath('', {
        name: 'subject',
        type: 'textVariable',
        repeat: { repeatMin: 1, repeatMax: 1 },
      });
      expect(actual).toStrictEqual('subject');
    });
    it('creates a path for non empty path', () => {
      const actual = createPath('nationalSubjectCategory', {
        name: 'subject',
        type: 'textVariable',
        repeat: { repeatMin: 1, repeatMax: 1 },
      });
      expect(actual).toStrictEqual('nationalSubjectCategory.subject');
    });

    it('creates a path for empty path with attributes with array', () => {
      const actual = createPath('', {
        name: 'subject',
        type: 'textVariable',
        repeat: { repeatMin: 1, repeatMax: 1 },
        attributes: {
          language: 'swe',
        },
      });
      expect(actual).toStrictEqual('subject_language_swe');
    });
    it('creates a path for non empty path with attributes with array', () => {
      const actual = createPath('nationalSubjectCategory', {
        name: 'subject',
        type: 'textVariable',
        repeat: { repeatMin: 1, repeatMax: 1 },
        attributes: {
          language: 'swe',
        },
      });
      expect(actual).toStrictEqual(
        'nationalSubjectCategory.subject_language_swe',
      );
    });
  });
  describe('addNamesToArray', () => {
    it('1', () => {
      const data = {
        name: 'nationalSubjectCategory',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        children: [
          {
            name: 'subject',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'notSubject',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      };
      const actual = addNamesToArray(data as FormMetaData);
      expect(actual).toStrictEqual([]);
    });
    it('2', () => {
      const data = {
        name: 'nationalSubjectCategory',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        children: [
          {
            name: 'subject',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'subject',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      };
      const actual = addNamesToArray(data as FormMetaData);
      expect(actual).toStrictEqual(['subject']);
    });
    it('3', () => {
      const data = {
        name: 'nationalSubjectCategory',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        children: [
          {
            name: 'subject',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'subject',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            name: 'notSubject',
            type: 'textVariable',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
      };
      const actual = addNamesToArray(data as FormMetaData);
      expect(actual).toStrictEqual(['subject']);
    });
    it('4', () => {
      const data = {
        name: 'nationalSubjectCategory',
        type: 'group',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        children: [
          {
            name: 'newRecordLink',
            type: 'recordLink',
            attributes: { language: 'swe' },
            repeat: { repeatMin: 1, repeatMax: 1 },
            linkedRecordType: 'nationalSubjectCategory',
          },
          {
            name: 'newRecordLink',
            type: 'recordLink',
            attributes: { language: 'eng' },
            repeat: { repeatMin: 1, repeatMax: 1 },
            linkedRecordType: 'nationalSubjectCategory',
          },
        ],
      };
      const actual = addNamesToArray(data as FormMetaData);
      expect(actual).toStrictEqual(['newRecordLink']);
    });
  });
});
