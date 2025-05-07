import type { DataGroup } from '@/cora/cora-data/types.server';
import { transformCoraAuth } from '@/cora/transform/transformCoraAuth';
import { test as base, type Page } from '@playwright/test';
import { createDivaOutput } from '../testData/divaOutput';
import { createLocalGenericMarkup } from 'e2e/testData/localGenericMarkup';

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
  kthPage: Page;
  divaOutput: DataGroup;
  kthDivaOutput: DataGroup;
  uuLocalGenericMarkup: DataGroup;
  kthLocalGenericMarkup: DataGroup;
}

export const test = base.extend<Fixtures>({
  authtoken: async ({ request }, use) => {
    const response = await request.post(`${CORA_LOGIN_URL}/apptoken`, {
      data: 'divaAdmin@cora.epc.ub.uu.se\n49ce00fb-68b5-4089-a5f7-1c225d3cf156',
      headers: {
        'Content-Type': 'application/vnd.cora.login',
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
      data: createDivaOutput(),
      headers: {
        Accept: 'application/vnd.cora.record+json',
        'Content-Type': 'application/vnd.cora.recordGroup+json',
        Authtoken: authtoken,
      },
    });
    const responseBody = await response.json();

    await use(responseBody.record.data);

    await request.delete(responseBody.record.actionLinks.delete.url, {
      headers: { Authtoken: authtoken },
    });
  },

  kthDivaOutput: async ({ request, authtoken }, use) => {
    const response = await request.post(`${CORA_API_URL}/record/diva-output`, {
      data: createDivaOutput('kth'),
      headers: {
        Accept: 'application/vnd.cora.record+json',
        'Content-Type': 'application/vnd.cora.recordGroup+json',
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

  uuLocalGenericMarkup: async ({ request, authtoken }, use) => {
    const response = await request.post(
      `${CORA_API_URL}/record/diva-localGenericMarkup`,
      {
        data: createLocalGenericMarkup('uu'),
        headers: {
          Accept: 'application/vnd.cora.record+json',
          'Content-Type': 'application/vnd.cora.recordGroup+json',
          Authtoken: authtoken,
        },
      },
    );

    const responseBody = await response.json();

    await use(responseBody.record.data);

    await request.delete(responseBody.record.actionLinks.delete.url, {
      headers: { Authtoken: authtoken },
    });
  },

  kthLocalGenericMarkup: async ({ request, authtoken }, use) => {
    const response = await request.post(
      `${CORA_API_URL}/record/diva-localGenericMarkup`,
      {
        data: createLocalGenericMarkup('kth'),
        headers: {
          Accept: 'application/vnd.cora.record+json',
          'Content-Type': 'application/vnd.cora.recordGroup+json',
          Authtoken: authtoken,
        },
      },
    );

    const responseBody = await response.json();

    await use(responseBody.record.data);

    await request.delete(responseBody.record.actionLinks.delete.url, {
      headers: { Authtoken: authtoken },
    });
  },
});
