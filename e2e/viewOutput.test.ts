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

  await expect(page.getByLabel(/^Id/)).toHaveText(recordId);
  await expect(page.getByLabel(/^Posttyp/)).toHaveText('diva-output');
  await expect(page.getByLabel(/^Valideringstyp/)).toHaveText(
    'publication_report',
  );
  await expect(page.getByLabel(/^Datadelare/)).toHaveText('divaData');
  await expect(page.getByLabel(/^Skapad av/)).toHaveText('161616');
  await expect(page.getByLabel(/^Huvudtitel/)).toHaveText(recordTitle);

  const languageGroup = page.getByRole('region', {
    name: 'Språk för resursen',
  });
  await expect(languageGroup.getByLabel(/^Språk/)).toHaveText('Ainu');
});
