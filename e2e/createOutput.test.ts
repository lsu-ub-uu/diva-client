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
  const mockSubtitle = faker.book.title();
  const mockAltTitle = faker.book.title();
  const mockAltSubtitle = faker.book.title();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const keywords = faker.lorem.words(10);

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
  await page
    .getByRole('combobox', { name: 'Record content source' })
    .fill('Uppsala universitet');
  await page.getByRole('option', { name: 'Uppsala universitet' }).click();

  await page.getByLabel(/^Konstnärligt arbete/).selectOption({ label: 'Sant' });

  await page
    .getByRole('region', {
      name: 'Språk för resursen',
    })
    .getByRole('combobox', { name: 'Språk' })
    .fill('Tyska');
  await page.getByRole('option', { name: 'Tyska', exact: true }).click();

  await page
    .getByLabel(/^Typ av innehåll/)
    .selectOption({ label: 'Sakkunniggranskat' });

  const titleGroup = page.getByRole('region', {
    name: 'Titel',
  });

  await titleGroup.getByRole('combobox', { name: 'Språk' }).fill('Tyska');
  await page.getByRole('option', { name: 'Tyska', exact: true }).click();

  await titleGroup.getByLabel('Huvudtitel').fill(mockTitle);
  await titleGroup.getByLabel('Undertitel').fill(mockSubtitle);

  await page.getByRole('button', { name: 'Alternativ titel' }).click();

  const alternativeTitleGroup = page.getByRole('region', {
    name: 'Alternativ Titel',
  });
  await alternativeTitleGroup
    .getByRole('combobox', { name: 'Språk' })
    .fill('Tyska');
  await page.getByRole('option', { name: 'Tyska', exact: true }).click();

  await alternativeTitleGroup.getByLabel('Huvudtitel').fill(mockAltTitle);
  await alternativeTitleGroup.getByLabel('Undertitel').fill(mockAltSubtitle);

  const authorGroup = page.getByRole('region', {
    name: 'Författare, redaktör eller annan roll',
  });

  await authorGroup.getByRole('button', { name: 'Efternamn' }).click();
  await authorGroup.getByLabel('Efternamn').fill(lastName);
  await authorGroup.getByRole('button', { name: 'Förnamn' }).click();
  await authorGroup.getByLabel('Förnamn').fill(firstName);

  await page.getByLabel('Antal upphovspersoner').fill('2');

  const keywordsGroup = page.getByRole('region', {
    name: 'Nyckelord',
  });

  await keywordsGroup.getByRole('combobox', { name: 'Språk' }).fill('Tyska');
  await page.getByRole('option', { name: 'Tyska', exact: true }).click();

  await keywordsGroup.getByLabel('nyckelord').fill(keywords);

  await page
    .getByRole('combobox', {
      name: 'Standard för svensk indelning av forskningsämnen',
    })
    .fill('Atom- och molekylfysik och optik');
  await page
    .getByRole('option', {
      name: '(10302) Atom- och molekylfysik och optik',
      exact: true,
    })
    .click();

  const sustainableDevelopmentGroup = page.getByRole('region', {
    name: 'Hållbar utveckling',
  });
  await sustainableDevelopmentGroup
    .getByLabel(/^Globalt mål för hållbar utveckling/)
    .selectOption({
      label: '8. Anständiga arbetsvillkor och ekonomisk tillväxt',
    });

  await page
    .getByLabel('År')
    .fill(faker.date.recent().getFullYear().toString());

  await page
    .getByLabel(/^Bibliografiskt granskad/)
    .selectOption({ label: 'Sant' });

  await page
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
