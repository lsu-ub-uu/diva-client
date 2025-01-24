import type { DataGroup } from '@/cora/cora-data/CoraData.server';
import { test as base } from '@playwright/test';
import { divaOuputWithMinimalData } from './testData';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';

const { CORA_API_URL, CORA_LOGIN_URL } = process.env;

interface Fixtures {
  authtoken: string;
  divaOutput: DataGroup;
}

export const test = base.extend<Fixtures>({
  authtoken: async ({ request }, use) => {
    const response = await request.post(`${CORA_LOGIN_URL}/apptoken`, {
      data: 'divaAdmin@cora.epc.ub.uu.se\n49ce00fb-68b5-4089-a5f7-1c225d3cf156',
      headers: {
        'Content-Type': 'application/vnd.uub.login',
      },
    });
    const responseBody = await response.json();
    const authtoken = getFirstDataAtomicValueWithNameInData(
      responseBody.data,
      'token',
    );

    await use(authtoken);

    await request.delete(responseBody.actionLinks.delete.url, {
      headers: { Authtoken: authtoken },
    });
  },

  divaOutput: async ({ request, authtoken }, use) => {
    const response = await request.post(`${CORA_API_URL}/record/diva-output`, {
      data: divaOuputWithMinimalData,
      headers: {
        Accept: 'application/vnd.uub.record+json',
        'Content-Type': 'application/vnd.uub.record+json',
        Authtoken: authtoken,
      },
    });
    const responseBody = await response.json();

    await use(responseBody.record.data);

    await request.delete(responseBody.record.actionLinks.delete.url, {
      headers: { Authtoken: authtoken },
    });
  },
});
