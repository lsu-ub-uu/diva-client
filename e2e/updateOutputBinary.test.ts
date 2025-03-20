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
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { expect } from '@playwright/test';
import { createUrl } from './util/createUrl';
import path from 'node:path';

let downloadLink: string | null = null;

test('updates an existing report with a binary', async ({
  page,
  divaOutput,
}) => {
  const recordId = getFirstDataAtomicValueWithNameInData(
    getFirstDataGroupWithNameInData(divaOutput, 'recordInfo'),
    'id',
  );
  const recordTitle = getFirstDataAtomicValueWithNameInData(
    getFirstDataGroupWithNameInData(divaOutput, 'titleInfo'),
    'title',
  );

  await page.goto(createUrl(`/diva-output/${recordId}/update`));

  // Log in
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.getByRole('menuitem', { name: 'DiVA Admin' }).click();
  await expect(page.getByRole('button', { name: 'Logga ut' })).toBeVisible();

  //Assert update page info
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(recordTitle);
  await expect(
    page.getByRole('group', { name: 'Huvudtitel' }).getByLabel('Huvudtitel'),
  ).toHaveValue(recordTitle);

  await page
    .getByLabel('Bifogad fil')
    .setInputFiles(path.join(import.meta.dirname, 'assets/dog.jpg'));

  await expect(page.getByLabel('Originalfilnam')).toHaveText('dog.jpg');

  const attachmentGroup = page.getByRole('region', {
    name: 'Bilaga',
  });
  await attachmentGroup
    .getByRole('group', { name: 'Typ' })
    .getByLabel('Typ')
    .selectOption({ label: 'Bild' });

  await page.getByRole('button', { name: 'Skicka in' }).click();

  await expect(
    page.getByText(/^Record was successfully updated/),
  ).toBeVisible();

  // Store binary record URL to use in cleanup step.
  downloadLink = await page
    .getByRole('link', { name: 'Ladda ner' })
    .getAttribute('href');
});

test.afterAll(async ({ authtoken, request }) => {
  /* Delete binary record */
  const recordUrl = downloadLink?.replace(/\/master.*/, '');

  if (recordUrl) {
    await request.delete(recordUrl, {
      headers: { authToken: authtoken },
    });
  }
});
