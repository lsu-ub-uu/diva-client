/*
 * Copyright 2025 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { test } from './util/fixtures';
import { expect, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { createUrl } from './util/createUrl';

test('Create report', async ({ page, request, authtoken }) => {
  const mockTitle = faker.book.title();

  // Go to start page
  await page.goto(createUrl('/'));

  // Log in
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.getByRole('menuitem', { name: 'DiVA Admin' }).click();
  await expect(page.getByRole('button', { name: 'Logga ut' })).toBeVisible();

  // Select validation type
  await page.getByRole('button', { name: 'Skapa output' }).click();
  await page.getByRole('menuitem', { name: 'Rapport' }).click();

  await expect(page).toHaveTitle(/^Skapa publikation/);

  // Fill create form
  await page.getByRole('combobox', { name: 'Rättighetsenhet' }).fill('uu');
  await page.getByRole('option', { name: 'Rättighetsenhet' }).click();

  await page
    .getByRole('region', {
      name: 'Språk för resursen',
    })
    .getByRole('combobox', { name: 'Språk' })
    .fill('Tyska');
  await page.getByRole('option', { name: 'Tyska', exact: true }).click();

  await page
    .getByRole('group', { name: 'Typ av innehåll' })
    .getByLabel('Typ av innehåll')
    .selectOption({ label: 'Sakkunniggranskat' });

  const titleGroup = page.getByRole('region', {
    name: 'Titel',
  });

  await titleGroup.getByRole('combobox', { name: 'Språk' }).fill('Tyska');
  await page.getByRole('option', { name: 'Tyska', exact: true }).click();

  await titleGroup
    .getByRole('group', { name: 'Huvudtitel' })
    .getByLabel('Huvudtitel')
    .fill(mockTitle);

  await page
    .getByRole('group', { name: 'År' })
    .getByLabel('År')
    .fill(faker.date.recent().getFullYear().toString());

  await page
    .getByRole('group', { name: /^Bibliografiskt granskad/ })
    .getByLabel(/^Bibliografiskt granskad/)
    .selectOption({ label: 'Sant' });

  await page
    .getByRole('group', { name: /^Postens synlighet/ })
    .getByLabel(/^Postens synlighet/)
    .selectOption({ label: 'Publicerad' });

  // Submit
  await page.getByRole('button', { name: 'Skicka in' }).click();

  // Assert redirected to update page
  await expect(
    page.getByText(/^Record was successfully created/),
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(mockTitle);

  // Clean up created record
  const id = getRecordIdFromUpdatePageUrl(page);
  await request.delete(`${process.env.CORA_API_URL}/record/diva-output/${id}`, {
    headers: { Authtoken: authtoken },
  });
});

const getRecordIdFromUpdatePageUrl = (page: Page) => {
  const url = page.url(); // /diva-output/:id/update
  const segments = url.split('/');
  return segments[segments.length - 2];
};
