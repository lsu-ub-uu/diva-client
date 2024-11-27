import axios, { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { coraApiUrl, RECORD_CONTENT_TYPE } from '@/cora/helper';
import { postRecordData } from '@/cora/postRecordData';

describe('postRecordData', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should post a record to Cora', async () => {
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedResponse = {
      status: 200,
    };
    const apiUrl: string = coraApiUrl(`/record/${divaOutputType}`);
    mockAxios
      .onPost(apiUrl, divaOutputData, {
        headers: {
          Accept: RECORD_CONTENT_TYPE,
          'Content-Type': RECORD_CONTENT_TYPE,
          Authtoken: `${authToken}`,
        },
      })
      .reply(200, expectedResponse);
    const response = await postRecordData(
      divaOutputData,
      divaOutputType,
      authToken,
    );
    expect(response.data).toEqual(expect.objectContaining(expectedResponse));
  });

  it('should NOT post a record to Cora with wrong divaOutputType', async () => {
    const authToken = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const expectedResponse = {
      status: 400,
    };
    const apiUrl: string = coraApiUrl(`/record/${divaOutputType}`);
    mockAxios
      .onPost(apiUrl, divaOutputData, {
        headers: {
          Accept: RECORD_CONTENT_TYPE,
          'Content-Type': RECORD_CONTENT_TYPE,
          Authtoken: `${authToken}`,
        },
      })
      .reply(400, expectedResponse);

    try {
      await postRecordData(divaOutputData, divaOutputType, authToken);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const castError: AxiosError = <AxiosError>error;
        expect(castError.response?.status).toBe(400);
      }
    }
  });
});

const divaOutputType = 'divaOutput';
const divaOutputData = {
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
