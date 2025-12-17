import axios, { AxiosError } from 'axios';
import { describe, expect, it, vi } from 'vitest';
import { getDeploymentInfo } from '../getDeploymentInfo.server';
import { DEPLOYMENT_INFO_CONTENT_TYPE } from '../helper.server';

vi.mock('axios');

describe('getDeploymentInfo', () => {
  it('returns deployment info', async () => {
    const requestSpy = vi.spyOn(axios, 'get').mockResolvedValue({
      status: 200,
      data: mockDeploymentInfo,
    });

    const result = await getDeploymentInfo();

    expect(requestSpy).toBeCalledWith('https://cora.epc.ub.uu.se/diva/rest/', {
      headers: {
        Accept: DEPLOYMENT_INFO_CONTENT_TYPE,
      },
    });

    expect(result).toStrictEqual(mockDeploymentInfo);
  });

  it('throws error when request fails', async () => {
    vi.spyOn(axios, 'get').mockRejectedValue(new AxiosError('Fail', '500'));

    await expect(getDeploymentInfo()).rejects.toThrow(AxiosError);
  });
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
