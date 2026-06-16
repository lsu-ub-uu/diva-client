import coraDivaClientContent from '../../app/__mocks__/bff/coraDivaClientContent.json';
import coraDivaRecordTypes from '../../app/__mocks__/bff/coraDivaRecordTypes.json';
import coraLoginUnit from '../../app/__mocks__/bff/coraLoginUnit.json';
import coraLoginWebRedirect from '../../app/__mocks__/bff/coraLoginWebRedirect.json';
import coraMetadata from '../../app/__mocks__/bff/coraMetadata.json';
import coraOrganisationListWithOneOrganisation from '../../app/__mocks__/bff/coraOrganisationListWithOneOrganisation.json';
import coraPresentationGuiElement from '../../app/__mocks__/bff/coraPresentationGuiElement.json';
import coraPresentationWithMiscTypes from '../../app/__mocks__/bff/coraPresentationWithMiscTypes.json';
import coraSearch from '../../app/__mocks__/bff/coraSearch.json';
import coraTextWithOneChildOnlySwedish from '../../app/__mocks__/bff/coraTextWithOneChildOnlySwedish.json';
import divaMemberListWithDivaMember from '../../app/__mocks__/bff/divaMemberListWithDivaMember.json';
import emptyDataList from '../../app/__mocks__/bff/emptyDataList.json';
import validationTypeList from '../../app/__mocks__/bff/validationTypeList.json';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

const coraApiUrl = process.env.CORA_API_URL ?? 'https://cora.mock/rest';
const coraLoginUrl =
  process.env.CORA_LOGIN_URL ?? 'https://cora.mock/login/rest';
const coraExternalSystemUrl =
  process.env.CORA_EXTERNAL_SYSTEM_URL ?? 'https://cora.mock';

const recordListByType: Record<string, unknown> = {
  text: coraTextWithOneChildOnlySwedish,
  metadata: coraMetadata,
  presentation: coraPresentationWithMiscTypes,
  validationType: validationTypeList,
  guiElement: coraPresentationGuiElement,
  recordType: coraDivaRecordTypes,
  search: coraSearch,
  loginUnit: coraLoginUnit,
  login: coraLoginWebRedirect,
  'diva-member': divaMemberListWithDivaMember,
  'diva-organisation': coraOrganisationListWithOneOrganisation,
  'diva-clientContent': coraDivaClientContent,
};

const storedRecords = new Map<string, unknown>();

const recordKey = (type: string, id: string) => `${type}:${id}`;

const createAuthenticationResponse = () => {
  return {
    authentication: {
      data: {
        name: 'authToken',
        children: [
          { name: 'token', value: 'test-token' },
          { name: 'validUntil', value: '1999999999999' },
          { name: 'renewUntil', value: '1999999999999' },
          { name: 'userId', value: 'coraUser:test' },
          { name: 'loginId', value: 'test.user@example.org' },
          { name: 'firstName', value: 'Test' },
          { name: 'lastName', value: 'User' },
        ],
      },
      actionLinks: {
        renew: {
          rel: 'renew',
          requestMethod: 'POST',
          url: `${coraLoginUrl}/authToken/test-token`,
          accept: 'application/vnd.cora.authentication+json',
        },
        delete: {
          rel: 'delete',
          requestMethod: 'DELETE',
          url: `${coraLoginUrl}/authToken/test-token`,
        },
      },
    },
  };
};

const mockDeploymentInfo = {
  applicationName: 'diva',
  deploymentName: 'DiVA - preview',
  coraVersion: '0.1.0',
  applicationVersion: '0.1.0',
  urls: {
    REST: `${coraExternalSystemUrl}/rest/`,
    appTokenLogin: `${coraExternalSystemUrl}/login/rest/apptoken`,
    passwordLogin: `${coraExternalSystemUrl}/login/rest/password`,
    record: `${coraExternalSystemUrl}/rest/record/`,
    recordType: `${coraExternalSystemUrl}/rest/record/recordType`,
    iiif: `${coraExternalSystemUrl}/iiif/`,
  },
  exampleUsers: [
    {
      name: 'DiVA SystemAdmin',
      text: 'Apptoken, 161616',
      type: 'appTokenLogin',
      loginId: 'divaAdmin@cora.epc.ub.uu.se',
      appToken: 'ad07017a-e5a3-498a-b788-c7af2a908464',
    },
  ],
};

const server = setupServer(
  http.get(`${coraApiUrl}/`, () => {
    return HttpResponse.json(mockDeploymentInfo);
  }),
  http.get(`${coraApiUrl}`, () => {
    return HttpResponse.json(mockDeploymentInfo);
  }),
  http.get(`${coraApiUrl}/record/searchResult/outputPublicSearch`, () => {
    return HttpResponse.json(emptyDataList);
  }),
  http.get(`${coraApiUrl}/record/:type/:id`, ({ params }) => {
    const type = String(params.type);
    const id = String(params.id);
    const stored = storedRecords.get(recordKey(type, id));

    if (stored) {
      return HttpResponse.json(stored);
    }

    const fallback = recordListByType[type];
    if (!fallback) {
      return HttpResponse.json(
        { error: 'unknownRecordType', type },
        { status: 404 },
      );
    }

    return HttpResponse.json(fallback);
  }),
  http.get(`${coraApiUrl}/record/:type`, ({ params }) => {
    const type = String(params.type);
    const responseData = recordListByType[type];

    if (!responseData) {
      return HttpResponse.json(
        { error: 'unknownRecordType', type },
        { status: 404 },
      );
    }

    return HttpResponse.json(responseData);
  }),
  http.post(`${coraApiUrl}/record/:type`, async ({ params, request }) => {
    const type = String(params.type);
    const id = crypto.randomUUID();
    const body = await request.json().catch(() => ({}));
    storedRecords.set(recordKey(type, id), body);

    return HttpResponse.json(body, {
      status: 201,
      headers: {
        Location: `${coraApiUrl}/record/${type}/${id}`,
      },
    });
  }),
  http.put(`${coraApiUrl}/record/:type/:id`, async ({ params, request }) => {
    const type = String(params.type);
    const id = String(params.id);
    const body = await request.json().catch(() => ({}));
    storedRecords.set(recordKey(type, id), body);

    return new HttpResponse(null, { status: 204 });
  }),
  http.delete(`${coraApiUrl}/record/:type/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.post(`${coraApiUrl}/record/binary/`, () => {
    return HttpResponse.json({});
  }),
  http.get(`${coraApiUrl}/record/binary/:id/:name`, () => {
    return new HttpResponse(new Uint8Array([1, 2, 3]), {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    });
  }),
  http.post(`${coraApiUrl}/record/binary/:id/:name`, () => {
    return new HttpResponse(null, { status: 200 });
  }),
  http.post(`${coraLoginUrl}/apptoken`, () => {
    return HttpResponse.json(createAuthenticationResponse());
  }),
  http.post(`${coraLoginUrl}/password`, () => {
    return HttpResponse.json(createAuthenticationResponse());
  }),
  http.post(`${coraLoginUrl}/authToken/:id`, () => {
    return HttpResponse.json(createAuthenticationResponse());
  }),
  http.delete(`${coraLoginUrl}/authToken/:id`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
);

let mswStarted = false;

export const startCoraMswServer = () => {
  if (mswStarted) {
    return;
  }

  server.listen({
    onUnhandledRequest: 'bypass',
  });
  mswStarted = true;
  console.info('Cora MSW server started');
};

export const stopCoraMswServer = () => {
  if (!mswStarted) {
    return;
  }

  server.close();
  mswStarted = false;
};
