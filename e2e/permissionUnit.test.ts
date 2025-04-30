import { createUrl } from './util/createUrl';
import { test } from './util/fixtures';
import { expect } from '@playwright/test';
import { logIn } from './util/logIn';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';

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

  test('Auto filters permission unit when on search page for sub-domain', async ({
    divaOutput,
    kthDivaOutput,
    kthPage,
  }) => {
    const uuRecordId = getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(divaOutput, 'recordInfo'),
      'id',
    );
    const kthRecordId = getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(kthDivaOutput, 'recordInfo'),
      'id',
    );

    await kthPage.goto(createUrl('/'));
    await expect(
      kthPage.getByRole('button', { name: 'Logga in' }),
    ).toBeEnabled();

    await kthPage.getByRole('textbox', { name: 'Fritext' }).fill('**');
    await kthPage.getByRole('button', { name: 'Sök', exact: true }).click();

    await expect(await kthPage.getByText(kthRecordId)).toBeVisible();
    await expect(await kthPage.getByText(uuRecordId)).not.toBeVisible();
  });

  test('Auto filters autocomple searches in forms for sub-domain', async ({
    kthPage,
    uuLocalGenericMarkup,
    kthLocalGenericMarkup,
  }) => {
    const uuRecordId = getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(uuLocalGenericMarkup, 'recordInfo'),
      'id',
    );
    const kthRecordId = getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(kthLocalGenericMarkup, 'recordInfo'),
      'id',
    );

    await kthPage.goto(createUrl('/'));

    await logIn(kthPage);

    await kthPage.getByRole('button', { name: 'Skapa output' }).click();
    await kthPage.getByRole('menuitem', { name: 'Rapport' }).click();

    await expect(kthPage).toHaveTitle(/^Skapa publikation/);

    await kthPage
      .getByRole('combobox', {
        name: 'DiVA-lokal generisk uppmärkning',
      })
      .fill('**');

    // TODO use getByRole when options have accessible names
    await expect(
      kthPage.locator('[role="option"]', { hasText: kthRecordId }),
    ).toBeVisible();

    await expect(await kthPage.getByText(kthRecordId)).toBeVisible();
    await expect(await kthPage.getByText(uuRecordId)).not.toBeVisible();
  });
});
