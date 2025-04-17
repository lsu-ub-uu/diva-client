import { getFirstDataGroupWithNameInData } from '@/cora/cora-data/CoraDataUtils.server';
import { getFirstDataAtomicValueWithNameInData } from '@/cora/cora-data/CoraDataUtilsWrappers.server';
import { expect } from '@playwright/test';
import { test } from './util/fixtures';
import { createUrl } from './util/createUrl';

test.describe('Search output', () => {
  test('Search for records', async ({ page, divaOutput }) => {
    const recordTitle = getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(divaOutput, 'titleInfo'),
      'title',
    );
    const recordId = getFirstDataAtomicValueWithNameInData(
      getFirstDataGroupWithNameInData(divaOutput, 'recordInfo'),
      'id',
    );

    await page.goto(createUrl('/diva-output'));
    await expect(page.getByRole('button', { name: 'Logga in' })).toBeEnabled();

    await page.getByRole('textbox', { name: 'Fritext' }).fill(recordTitle);

    await expect(
      await page.getByRole('textbox', { name: 'Fritext' }),
    ).toHaveValue(recordTitle);
    await page.getByRole('button', { name: 'Sök', exact: true }).click();

    await expect(await page.getByText(recordId)).toBeVisible();
  });
});
