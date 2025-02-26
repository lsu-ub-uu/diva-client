import {
  extractAttributeValueByName,
  extractIdFromRecordInfo,
  extractLinkedRecordIdFromNamedRecordLink,
  fetchLinkedRecordForRecordLinkWithNameInData,
} from '../CoraDataTransforms.server';
import type { DataGroup } from '@/cora/cora-data/types.server';
import { expect } from 'vitest';
import { getRecordDataById } from '@/cora/getRecordDataById.server';
import divaThemeLogoBinary from '@/__mocks__/bff/divaThemeLogoBinary.json';
import type { AxiosResponse } from 'axios';

vi.mock('@/cora/getRecordDataById.server');
const someRecordGroup = {
  name: 'parent',
  children: [
    {
      name: 'recordInfo',
      children: [
        {
          name: 'id',
          value: 'someTextVar',
        },
      ],
    },
  ],
};

const someGroupWithAttribute = {
  name: 'parent',
  children: [
    {
      name: 'id',
      value: 'someTextVar',
    },
  ],
  attributes: {
    type: 'someTextVariable',
  },
};

describe('CoraDataTransform', () => {
  describe('extractIdFromRecordInfo', () => {
    it('returns id from recordInfo', () => {
      const id = extractIdFromRecordInfo(someRecordGroup);
      expect(id).toEqual('someTextVar');
    });
  });

  describe('extractAttributeValueByName', () => {
    it('returns an attribute from DataGroup', () => {
      const attribute = extractAttributeValueByName(
        someGroupWithAttribute,
        'type',
      );
      expect(attribute).toEqual('someTextVariable');
    });

    it('throw error when attribute does not exist for DataGroup', () => {
      expect(() => {
        extractAttributeValueByName(
          someGroupWithAttribute,
          'wrongAttributeName',
        );
      }).toThrow(Error);

      try {
        extractAttributeValueByName(
          someGroupWithAttribute,
          'wrongAttributeName',
        );
      } catch (error: unknown) {
        const attributeError: Error = <Error>error;
        expect(attributeError.message).toStrictEqual(
          'Attribute with name [wrongAttributeName] does not exist',
        );
      }
    });
    it('throw error when attributes container does not exist for DataGroup', () => {
      expect(() => {
        extractAttributeValueByName(someRecordGroup, 'someAttributeName');
      }).toThrow(Error);

      try {
        extractAttributeValueByName(someRecordGroup, 'someAttributeName');
      } catch (error: unknown) {
        const attributeError: Error = <Error>error;
        expect(attributeError.message).toStrictEqual(
          'Attribute with name [someAttributeName] does not exist',
        );
      }
    });
  });
  describe('extractLinkedRecordIdFromNamedRecordLink', () => {
    const temp: DataGroup = {
      children: [
        {
          children: [
            {
              name: 'id',
              value: 'testLoginPassword',
            },
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'recordType',
                },
                {
                  name: 'linkedRecordId',
                  value: 'login',
                },
              ],
              actionLinks: {
                read: {
                  requestMethod: 'GET',
                  rel: 'read',
                  url: 'https://cora.epc.ub.uu.se/diva/rest/record/recordType/login',
                  accept: 'application/vnd.uub.record+json',
                },
              },
              name: 'type',
            },
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'validationType',
                },
                {
                  name: 'linkedRecordId',
                  value: 'loginPassword',
                },
              ],
              actionLinks: {
                read: {
                  requestMethod: 'GET',
                  rel: 'read',
                  url: 'https://cora.epc.ub.uu.se/diva/rest/record/validationType/loginPassword',
                  accept: 'application/vnd.uub.record+json',
                },
              },
              name: 'validationType',
            },
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'system',
                },
                {
                  name: 'linkedRecordId',
                  value: 'divaPre',
                },
              ],
              actionLinks: {
                read: {
                  requestMethod: 'GET',
                  rel: 'read',
                  url: 'https://cora.epc.ub.uu.se/diva/rest/record/system/divaPre',
                  accept: 'application/vnd.uub.record+json',
                },
              },
              name: 'dataDivider',
            },
            {
              repeatId: '0',
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'user',
                    },
                    {
                      name: 'linkedRecordId',
                      value: '161616',
                    },
                  ],
                  name: 'updatedBy',
                },
                {
                  name: 'tsUpdated',
                  value: '2024-07-03T12:19:18.204502Z',
                },
              ],
              name: 'updated',
            },
            {
              repeatId: '1',
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'user',
                    },
                    {
                      name: 'linkedRecordId',
                      value: '161616',
                    },
                  ],
                  name: 'updatedBy',
                },
                {
                  name: 'tsUpdated',
                  value: '2024-07-03T12:19:31.565473Z',
                },
              ],
              name: 'updated',
            },
            {
              repeatId: '2',
              children: [
                {
                  children: [
                    {
                      name: 'linkedRecordType',
                      value: 'user',
                    },
                    {
                      name: 'linkedRecordId',
                      value: '161616',
                    },
                  ],
                  name: 'updatedBy',
                },
                {
                  name: 'tsUpdated',
                  value: '2024-07-03T12:36:04.197154Z',
                },
              ],
              name: 'updated',
            },
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'user',
                },
                {
                  name: 'linkedRecordId',
                  value: '161616',
                },
              ],
              name: 'createdBy',
            },
            {
              name: 'tsCreated',
              value: '2024-07-03T12:19:18.204502Z',
            },
          ],
          name: 'recordInfo',
        },
        {
          children: [
            {
              name: 'linkedRecordType',
              value: 'metadata',
            },
            {
              name: 'linkedRecordId',
              value: 'viewDefinitionPasswordGroup',
            },
          ],
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/metadata/viewDefinitionPasswordGroup',
              accept: 'application/vnd.uub.record+json',
            },
          },
          name: 'viewDefinition',
        },
        {
          children: [
            {
              name: 'linkedRecordType',
              value: 'presentation',
            },
            {
              name: 'linkedRecordId',
              value: 'viewDefinitionPasswordPGroup',
            },
          ],
          actionLinks: {
            read: {
              requestMethod: 'GET',
              rel: 'read',
              url: 'https://cora.epc.ub.uu.se/diva/rest/record/presentation/viewDefinitionPasswordPGroup',
              accept: 'application/vnd.uub.record+json',
            },
          },
          name: 'viewPresentation',
        },
        {
          name: 'description',
          value: 'Test Password login for Diva',
        },
      ],
      name: 'login',
      attributes: {
        type: 'password',
      },
    };
    it('Throws error when linkedRecordId does not exist', () => {
      expect(() => {
        extractLinkedRecordIdFromNamedRecordLink(temp, 'notSomeLinkName');
      }).toThrow(Error);

      try {
        extractLinkedRecordIdFromNamedRecordLink(temp, 'notSomeLinkName');
      } catch (error: unknown) {
        const childMissingError: Error = <Error>error;
        expect(childMissingError.message).toStrictEqual(
          'Child with name [notSomeLinkName] does not exist',
        );
      }
    });
    it('return linkedRecordId from namedRecordLink', () => {
      const id = extractLinkedRecordIdFromNamedRecordLink(
        temp,
        'viewPresentation',
      );
      expect(id).toEqual('viewDefinitionPasswordPGroup');
    });
  });

  describe('fetchLinkedRecordForRecordLinkWithNameInData', () => {
    it('fetches linked record and returns it', async () => {
      vi.mocked(getRecordDataById).mockResolvedValue({
        data: divaThemeLogoBinary,
      } as AxiosResponse);

      const actual = await fetchLinkedRecordForRecordLinkWithNameInData(
        {
          children: [
            {
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'binary',
                },
                {
                  name: 'linkedRecordId',
                  value: 'binary:859116905887438',
                },
              ],
              name: 'logo',
            },
          ],
          name: 'diva-theme',
        },
        'logo',
      );

      expect(actual).toStrictEqual(divaThemeLogoBinary);
    });
  });
});
