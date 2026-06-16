import { defineConfig, devices } from '@playwright/test';

const appPort = 44173;
const simulatorPort = 38181;
const appBaseUrl = `http://127.0.0.1:${appPort}`;
const simulatorBaseUrl = `http://127.0.0.1:${simulatorPort}`;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './playwright',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: appBaseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run simulator and app server before starting tests */
  webServer: [
    {
      command: 'npx tsx playwright/cora-simulator/cora-simulator.ts',
      url: `${simulatorBaseUrl}/health`,
      reuseExistingServer: !process.env.CI,
      timeout: 120 * 1000,
      env: {
        CORA_SIMULATOR_PORT: String(simulatorPort),
        CORA_SIMULATOR_BASE_URL: simulatorBaseUrl,
      },
    },
    {
      command: 'npm run dev',
      url: `${appBaseUrl}/`,
      reuseExistingServer: !process.env.CI,
      timeout: 240 * 1000,
      env: {
        NODE_ENV: 'development',
        PORT: String(appPort),
        BASE_PATH: '',
        CORA_API_URL: `${simulatorBaseUrl}/rest`,
        CORA_LOGIN_URL: `${simulatorBaseUrl}/login/rest`,
        CORA_EXTERNAL_SYSTEM_URL: simulatorBaseUrl,
      },
    },
  ],
});
