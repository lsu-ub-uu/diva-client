import { createUrl } from './util/createUrl';
import { test } from './util/fixtures';
import { expect } from '@playwright/test';
import { logIn } from './util/logIn';

test.describe('Permission unit', () => {
  test('Auto sets permission unit when on sub-domain', async ({
    kthPage: page,
  }) => {
    await page.goto(createUrl('/'));

    await expect(page.getByRole('img', { name: 'KTH logo' })).toBeVisible();

    // Log in
    await logIn(page);

    // Select validation type
    await page.getByRole('button', { name: 'Skapa output' }).click();
    await page.getByRole('menuitem', { name: 'Rapport' }).click();

    await expect(page).toHaveTitle(/^Skapa publikation/);

    await expect(
      page.getByRole('combobox', { name: 'Rättighetsenhet' }),
    ).not.toBeVisible();

    await expect(
      page
        .getByRole('region', { name: 'Rättighetsenhet' })
        .getByText('Kungliga Tekniska högskolan'),
    ).toBeVisible();
  });
});
