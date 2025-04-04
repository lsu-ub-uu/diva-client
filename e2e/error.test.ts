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
import { expect } from '@playwright/test';
import { createUrl } from './util/createUrl';

test.describe('Error', () => {
  test('Shows 404 error page for missing record id', async ({ page }) => {
    const response = await page.goto(createUrl(`/diva-output/missingRecordId`));
    expect(response?.status()).toBe(404);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '404 - Hittades inte',
    );
  });

  test('Shows 400 error page for create page with missing validationType', async ({
    page,
  }) => {
    const response = await page.goto(createUrl('/diva-output/create'));
    expect(response?.status()).toBe(400);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '400 - Felaktig begäran',
    );
    await expect(page.getByText('Valideringstyp saknas i URL'));
  });

  test('Shows 404 error page for missing record type', async ({ page }) => {
    // Go to start page
    const response = await page.goto(createUrl('/wrong-record-type'));
    expect(response?.status()).toBe(404);

    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '404 - Hittades inte',
    );
  });

  test('Shows 404 error page for invalid validationType', async ({ page }) => {
    const response = await page.goto(
      createUrl('/diva-output/create?validationType=wrongValidationType'),
    );
    expect(response?.status()).toBe(404);

    expect(page.getByRole('heading', { level: 1 })).toHaveText(
      '404 - Hittades inte',
    );
  });
});
