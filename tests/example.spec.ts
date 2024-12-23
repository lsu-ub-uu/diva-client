import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

  await page.goto('http://localhost:5173/');

  await expect(page).toHaveTitle(/DiVA | Hem/);
});

test('header exists and contains expected elements', async ({ page }) => {

  await page.goto('http://localhost:5173/');

  const header = page.locator('header.MuiAppBar-root');
  await expect(header).toBeVisible();

  const logo = page.locator('header img.logo');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('src', '/app/assets/divaLogo.svg');

  const refreshButton = page.getByRole('button', { name: 'Refresh Def' });
  await expect(refreshButton).toBeVisible();

  const languageSelector = page.locator('header select[name="language"]');
  await expect(languageSelector).toBeVisible();

  const loginButton = page.getByRole('button', { name: 'Logga in' });
  await expect(loginButton).toBeVisible();
});

test('clicking "Logga in" button shows account list', async ({ page }) => {

  await page.goto('http://localhost:5173/');

  const header = page.locator('header.MuiAppBar-root');
  await expect(header).toBeVisible();

  const logo = page.locator('header img.logo');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('src', '/app/assets/divaLogo.svg');

  const refreshButton = page.getByRole('button', { name: 'Refresh Def' });
  await expect(refreshButton).toBeVisible();

  const languageSelector = page.locator('header select[name="language"]');
  await expect(languageSelector).toBeVisible();

  const loginButton = page.getByRole('button', { name: 'Logga in' });
  await loginButton.click();

  await page.waitForSelector('.MuiMenuItem-root');

  const menuItems = await page.locator('.MuiMenuItem-root').all();

  const listItems = await Promise.all(
    menuItems.map(async (item) => await item.textContent())
  );

  expect(listItems).toEqual([
    'Utvecklarkonto',
    'DiVA Admin',
    'DiVA Everything',
    'Admin System',
    'UU domainAdmin',
    'KTH domainAdmin',
    'Gemensam inloggning',
    'Uppsala universitet (Preview)',
    'Användarnamn & Lösenord',
    'Diva Uppsala Universitet (Lösenord)'
  ]);
});

test('clicking "Logga in" button shows account list and DiVA Admin works', async ({ page }) => {

  await page.goto('http://localhost:5173/');

  const header = page.locator('header.MuiAppBar-root');
  await expect(header).toBeVisible();

  const logo = page.locator('header img.logo');
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute('src', '/app/assets/divaLogo.svg');

  const refreshButton = page.getByRole('button', { name: 'Refresh Def' });
  await expect(refreshButton).toBeVisible();

  const languageSelector = page.locator('header select[name="language"]');
  await expect(languageSelector).toBeVisible();

  const loginButton = page.getByRole('button', { name: 'Logga in' });
  await loginButton.click();

  await page.waitForSelector('.MuiMenuItem-root');

  const menuItems = await page.locator('.MuiMenuItem-root').all();

  const listItems = await Promise.all(
    menuItems.map(async (item) => await item.textContent())
  );

  expect(listItems).toEqual([
    'Utvecklarkonto',
    'DiVA Admin',
    'DiVA Everything',
    'Admin System',
    'UU domainAdmin',
    'KTH domainAdmin',
    'Gemensam inloggning',
    'Uppsala universitet (Preview)',
    'Användarnamn & Lösenord',
    'Diva Uppsala Universitet (Lösenord)'
  ]);

  await page.click('text=DiVA Admin');

  await page.waitForSelector('div.MuiStack-root div.MuiBox-root:has-text("DiVA Admin")');

  const divaAdminText = await page.textContent('div.MuiStack-root div.MuiBox-root:has-text("DiVA Admin")');
  expect(divaAdminText).toBe('DiVA Admin');

  const logoutButton = await page.textContent('button:has-text("Logga ut")');
  expect(logoutButton).toBe('Logga ut');
});


