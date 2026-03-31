import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment dynamically (default = 'qa')
const ENV = process.env.TEST_ENV || 'qa';

// Load .env.qa / .env.stage / .env.prod
dotenv.config({ path: `.env.${ENV}` });

const BASE_URL = process.env.BASE_URL;

if (!BASE_URL) {
  throw new Error(`❌ BASE_URL is missing in .env.${ENV}. Please define it.`);
}

export default defineConfig({
  timeout: 30_000,
  retries: 2,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'
  },

  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});