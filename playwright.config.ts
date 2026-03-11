import { defineConfig, devices } from '@playwright/test';

import * as dotenv from 'dotenv';


dotenv.config();
const BASE_URL = process.env.BASE_URL;

if (!BASE_URL) {
  throw new Error("❌ BASE_URL is missing. Define it in your .env file.");
}

export default defineConfig({
  timeout: 30_000,
  retries: 2,                     // auto-retry flakes in CI
  workers: process.env.CI ? 4 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }] // for CI test trends
  ],
  use: {
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
   // { name: 'Firefox',  use: { ...devices['Desktop Firefox'] } },
    //{ name: 'WebKit',   use: { ...devices['Desktop Safari'] } }
  ]
});
