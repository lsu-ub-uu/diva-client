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
import { faker } from '@faker-js/faker';
import { createUrl } from './util/createUrl';

test('updates an existing report', async ({ page, divaOutput }) => {
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
  await expect(page.getByLabel(/^Huvudtitel/)).toHaveValue(recordTitle);

  await page
    .getByLabel('År')
    .fill(faker.date.recent().getFullYear().toString());

  await page.getByRole('button', { name: 'Skicka in' }).click();

  await expect(
    page.getByText(/^Record was successfully updated/),
  ).toBeVisible();
});
