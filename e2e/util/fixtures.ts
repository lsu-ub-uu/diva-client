import { test as base, type Page } from '@playwright/test';
import { divaOutputWithMinimalData } from './testData';
import type { DataGroup } from '@/cora/cora-data/types.server';
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';

/* eslint-disable react-hooks/rules-of-hooks */

const {
  CORA_API_URL,
  CORA_LOGIN_URL,
  DOMAIN = 'localhost',
  BASE_PATH = '',
  PORT = '5173',
} = process.env;

interface Fixtures {
  authtoken: string;
  divaOutput: DataGroup;
  kthPage: Page;
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
    const auth = transformCoraAuth(responseBody);

    await use(auth.data.token);

    await request.delete(auth.actionLinks.delete.url, {
      headers: { Authtoken: auth.data.token },
    });
  },

  divaOutput: async ({ request, authtoken }, use) => {
    const response = await request.post(`${CORA_API_URL}/record/diva-output`, {
      data: divaOutputWithMinimalData,
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

  kthPage: async ({ browser }, use) => {
    // Set up
    const context = await browser.newContext({
      baseURL: `http://kth.${DOMAIN}:${PORT}${BASE_PATH}`,
    });
    const page = await context.newPage();

    await use(page);

    // Clean up
    await page.close();
    await context.close();
  },
});
