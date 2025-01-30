import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { test } from './fixtures';
import { expect } from '@playwright/test';
import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';

test('View diva-output', async ({ page, divaOutput }) => {
  const recordId = getFirstDataAtomicValueWithNameInData(
    getFirstDataGroupWithNameInData(divaOutput, 'recordInfo'),
    'id',
  );
  const recordTitle = getFirstDataAtomicValueWithNameInData(
    getFirstDataGroupWithNameInData(divaOutput, 'titleInfo'),
    'title',
  );

  await page.goto(`/view/diva-output/${recordId}`);

  await expect(await page.getByLabel(/^Id/)).toHaveText(recordId);
  await expect(await page.getByLabel(/^Posttyp/)).toHaveText('diva-output');
  await expect(await page.getByLabel(/^Valideringstyp/)).toHaveText(
    'diva-output',
  );
  await expect(await page.getByLabel(/^Datadelare/)).toHaveText('divaData');
  await expect(await page.getByLabel(/^Skapad av/)).toHaveText('161616');
  await expect(await page.getByLabel(/^Huvudtitel/)).toHaveText(recordTitle);
  await expect(await page.getByLabel(/^Språk/)).toHaveText(
    'Afrihili (artificiellt språk)',
  );
});
