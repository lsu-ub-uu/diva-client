import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { expect } from '@playwright/test';
import { test } from './util/fixtures';

test('Search for records', async ({ page, divaOutput }) => {
  const recordTitle = getFirstDataAtomicValueWithNameInData(
    getFirstDataGroupWithNameInData(divaOutput, 'titleInfo'),
    'title',
  );
  const recordId = getFirstDataAtomicValueWithNameInData(
    getFirstDataGroupWithNameInData(divaOutput, 'recordInfo'),
    'id',
  );

  await page.goto('/');
  await page.getByRole('textbox', { name: /^Fritext.*/ }).fill(recordTitle);
  await page.getByRole('button', { name: 'Sök' }).click();

  await expect(await page.getByText('Sökresultat')).toBeVisible();
  await expect(await page.getByText(recordId)).toBeVisible();
});
