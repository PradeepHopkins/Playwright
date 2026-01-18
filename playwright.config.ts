import { defineConfig, devices } from '@playwright/test';
import { AUTH_FILE } from './auth-path';

// import dotenv from 'dotenv';
// dotenv.config();  This ensures variables are available everywhere (tests, setup, fixtures).

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: require.resolve('./global-setup.ts'),
  globalTeardown: require.resolve('./global-teardown.ts'),
  // timeout: 10000,               // Default test timeout
  // globalTimeout: 10000,            // Entire test run timeout

  /* expect: {
      timeout: 2000  // set timeout for expect()
      }, */
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['junit', { outputFile: 'test-results/junitReport.xml'}],
    // ['allure-playwright']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    // actionTimeout: 5000,              // Timeout for actions (click, fill, etc.)
    // navigationTimeout: 60000,         // Timeout for navigation (page.goto, redirects)
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    extraHTTPHeaders: {
      'Authorization': `Token ${process.env.ACCESS_TOKEN}`
    },
    // video: 'on' // Default resoultion 800x800
    /*  video: {
       mode: 'on',
       size: {width: 1920, height: 1080}
     } */
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: 'auth.setup.ts' },

    {
      name: 'testProjectMatch',
      testMatch: 'article.setup.ts',
      dependencies: ['setup'],
      teardown: 'articlecleanup'
    },

    {
      name: 'articlecleanup',
      testMatch: 'article-cleanup-setup.ts'
    },

    {
      name: 'testProjectdependencies',
      testMatch: 'project-dependencies.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      dependencies: ['testProjectMatch']
    },

    {
      name: 'IgnoreTest',
      use: { ...devices['Desktop Chrome'], storageState: '.auth/user.json' },
      testIgnore: 'project-dependencies.spec.ts',
      dependencies: ['setup']
    },

    {
      name: 'Chromium',
      use: { ...devices['Desktop chrome'], storageState: AUTH_FILE },
      dependencies: ['setup']
    },

    {
      name: 'Mobile',
      testMatch: 'mobile-device-emulator.spec.ts',
      use: { ...devices['iPhone 15 Pro Max'] }
      // use: {
      //   viewport: { width: 480, height: 480 },
      // }
    }

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

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
