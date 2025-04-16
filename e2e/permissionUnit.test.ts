import { createUrl } from './util/createUrl';
import { test } from './util/fixtures';
import { expect } from '@playwright/test';
import { logIn } from './util/logIn';

test.describe('Permission unit', () => {
  test('Auto sets permission unit when on sub-domain from theme', async ({
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

  test('Auto sets permission unit when on regular domain from user', async ({
    page,
  }) => {
    await page.goto(createUrl('/'));

    // Log in
    await logIn(page, 'UU domainAdmin', 'domainAdmin UU');

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
        .getByText('Uppsala universitet'),
    ).toBeVisible();
  });

  test('Lets the user set a permission unit when on regular domain', async ({
    page,
  }) => {
    await page.goto(createUrl('/'));

    // Log in
    await logIn(page);

    // Select validation type
    await page.getByRole('button', { name: 'Skapa output' }).click();
    await page.getByRole('menuitem', { name: 'Rapport' }).click();

    await expect(page).toHaveTitle(/^Skapa publikation/);

    // Fill create form
    await page.getByRole('combobox', { name: 'Rättighetsenhet' }).fill('uu');
    await page.getByRole('option', { name: 'Rättighetsenhet' }).click();

    await expect(
      page
        .getByRole('region', { name: 'Rättighetsenhet' })
        .getByText('Uppsala universitet'),
    ).toBeVisible();
  });
});
