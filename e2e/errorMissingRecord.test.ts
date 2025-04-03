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

test('Shows error page for missing record id', async ({ page }) => {
  const response = await page.goto(createUrl(`/diva-output/missingRecordId`));
  expect(response?.status()).toBe(404);

  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    '404 - Hittades inte',
  );
});
