import {
  coraApiUrl,
  RECORD_CONTENT_TYPE,
  RECORD_GROUP_CONTENT_TYPE,
} from '@/cora/helper.server';
import { updateRecordDataById } from '@/cora/updateRecordDataById.server';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('updateRecordDataById', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should update data for a specific id', async () => {
    const type = 'divaOutput';
    const actual = {
      name: 'divaOutput',
      children: [
        {
          name: 'recordInfo',
          children: [
            {
              name: 'dataDivider',
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'system',
                },
                {
                  name: 'linkedRecordId',
                  value: 'divaData',
                },
              ],
            },
            {
              name: 'validationType',
              children: [
                {
                  name: 'linkedRecordType',
                  value: 'validationType',
                },
                {
                  name: 'linkedRecordId',
                  value: 'thesisManuscript',
                },
              ],
            },
          ],
        },
        {
          name: 'title',
          children: [
            {
              name: 'mainTitle',
              value: 'aaaa',
            },
          ],
        },
        {
          name: 'contentType',
          value: 'otherAcademic',
        },
        {
          name: 'outputType',
          children: [
            {
              name: 'outputType',
              value: 'artisticOutput',
            },
          ],
        },
        {
          name: 'domain',
          value: 'ivl',
        },
      ],
    };
    const recordId = 'divaOutput:11111111111111';
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedResponse = {
      status: 200,
    };
    const apiUrl: string = coraApiUrl(`/record/${type}/${recordId}`);
    mockAxios
      .onPost(apiUrl, actual, {
        headers: {
          Accept: RECORD_CONTENT_TYPE,
          'Content-Type': RECORD_GROUP_CONTENT_TYPE,
          Authtoken: `${authToken}`,
        },
      })
      .reply(200, expectedResponse);
    const response = await updateRecordDataById(
      recordId,
      actual,
      type,
      authToken,
    );
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });
});
