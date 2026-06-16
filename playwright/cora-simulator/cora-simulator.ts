import express, { type Request, type Response } from 'express';
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

const simulatorPort = Number.parseInt(
  process.env.CORA_SIMULATOR_PORT ?? '38181',
);
const simulatorBaseUrl =
  process.env.CORA_SIMULATOR_BASE_URL ?? `http://127.0.0.1:${simulatorPort}`;

const app = express();
app.use(express.text({ type: 'application/vnd.cora.login' }));
app.use(express.json());

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
          url: `${simulatorBaseUrl}/login/rest/authToken/test-token`,
          accept: 'application/vnd.cora.authentication+json',
        },
        delete: {
          rel: 'delete',
          requestMethod: 'DELETE',
          url: `${simulatorBaseUrl}/login/rest/authToken/test-token`,
        },
      },
    },
  };
};

app.use((req, res, next) => {
  if (req.path.startsWith('/__')) {
    next();
    return;
  }

  next();
});

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.get(
  '/rest/record/:type',
  (req: Request<{ type: string }>, res: Response) => {
    const responseData = recordListByType[req.params.type];

    if (!responseData) {
      res
        .status(404)
        .json({ error: 'unknownRecordType', type: req.params.type });
      return;
    }

    res.status(200).json(responseData);
  },
);

app.get('/rest', (req: Request, res: Response) => {
  res.status(200).json(mockDeploymentInfo);
});

app.get(
  '/rest/record/searchResult/outputPublicSearch',
  (_req: Request, res: Response) => {
    res.status(200).json(emptyDataList);
  },
);

app.post('/login/rest/apptoken', (_req: Request, res: Response) => {
  res.status(200).json(createAuthenticationResponse());
});

app.post('/login/rest/password', (_req: Request, res: Response) => {
  res.status(200).json(createAuthenticationResponse());
});

app.post('/login/rest/authToken/:id', (_req: Request, res: Response) => {
  res.status(200).json(createAuthenticationResponse());
});

app.delete('/login/rest/authToken/:id', (_req: Request, res: Response) => {
  res.status(204).send();
});

app.listen(simulatorPort, () => {
  console.info(`Cora simulator listening on ${simulatorBaseUrl}`);
});

const mockDeploymentInfo = {
  applicationName: 'diva',
  deploymentName: 'DiVA - preview 👀',
  coraVersion: '0.1.0',
  applicationVersion: '0.1.0',
  urls: {
    REST: 'https://preview.diva.cora.epc.ub.uu.se/rest/',
    appTokenLogin: 'https://preview.diva.cora.epc.ub.uu.se/login/rest/apptoken',
    passwordLogin: 'https://preview.diva.cora.epc.ub.uu.se/login/rest/password',
    record: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/',
    recordType: 'https://preview.diva.cora.epc.ub.uu.se/rest/record/recordType',
    iiif: 'https://preview.diva.cora.epc.ub.uu.se/iiif/',
  },
  exampleUsers: [
    {
      name: 'DiVA SystemAdmin',
      text: 'Apptoken, 161616',
      type: 'appTokenLogin',
      loginId: 'divaAdmin@cora.epc.ub.uu.se',
      appToken: 'ad07017a-e5a3-498a-b788-c7af2a908464',
    },
    {
      name: 'SystemOne Admin',
      text: 'Apptoken, 141414',
      type: 'appTokenLogin',
      loginId: 'systemoneAdmin@system.cora.uu.se',
      appToken: '45333bb9-72c7-4fde-a678-f39ec5c72a81',
    },
    {
      name: 'admin Nordiska Museet',
      text: 'Apptoken, user:182924359788077',
      type: 'appTokenLogin',
      loginId: 'adminNordiskaMuseet@diva.cora.uu.se',
      appToken: '8dc95c3e-4bf8-4267-a20e-cf01b90cf1ad',
    },
    {
      name: 'DomainAdmin Nordiska Museet',
      text: 'Apptoken, user:8985188367779791',
      type: 'appTokenLogin',
      loginId: 'domainAdminNordiskaMuseet@diva.cora.uu.se',
      appToken: '8748b09d-8b65-4e4a-ae13-218db0963758',
    },
    {
      name: 'domainAdmin UU',
      text: 'Apptoken, coraUser:491144693381458',
      type: 'appTokenLogin',
      loginId: 'dominAdminUU@diva.cora.uu.se',
      appToken: '2b04400e-6c21-49c3-a893-f1fa48350b86',
    },
    {
      name: 'domainAdmin KTH',
      text: 'Apptoken, coraUser:491201365536105',
      type: 'appTokenLogin',
      loginId: 'domainAdminKTH@diva.cora.uu.se',
      appToken: '675ec5c1-9965-4ae6-9b95-20b858e3e060',
    },
  ],
};
