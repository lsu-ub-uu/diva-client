import { expect, type Page } from '@playwright/test';

export const logIn = async (page: Page, userName: string = 'DiVA Admin') => {
  // Log in
  await page.getByRole('button', { name: 'Logga in' }).click();
  await page.getByRole('menuitem', { name: userName }).click();
  await expect(page.getByRole('button', { name: userName })).toBeVisible();
};
