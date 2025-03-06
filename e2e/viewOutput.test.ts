import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { test } from './util/fixtures';
import { expect } from '@playwright/test';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { createUrl } from './util/createUrl';

test('View report', async ({ page, divaOutput }) => {
  const recordId = getFirstDataAtomicValueWithNameInData(
    getFirstDataGroupWithNameInData(divaOutput, 'recordInfo'),
    'id',
  );
  const recordTitle = getFirstDataAtomicValueWithNameInData(
    getFirstDataGroupWithNameInData(divaOutput, 'titleInfo'),
    'title',
  );

  await page.goto(createUrl(`/diva-output/${recordId}`));

  await expect(await page.getByLabel(/^Id/)).toHaveText(recordId);
  await expect(await page.getByLabel(/^Posttyp/)).toHaveText('diva-output');
  await expect(await page.getByLabel(/^Valideringstyp/)).toHaveText(
    'publication_report',
  );
  await expect(await page.getByLabel(/^Datadelare/)).toHaveText('divaData');
  await expect(await page.getByLabel(/^Skapad av/)).toHaveText('161616');
  await expect(await page.getByLabel(/^Huvudtitel/)).toHaveText(recordTitle);

  const languageGroup = await page.getByRole('region', {
    name: 'Språk för resursen',
  });
  await expect(await languageGroup.getByLabel(/^Språk/)).toHaveText('Ainu');
});
