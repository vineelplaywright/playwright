import { defineConfig } from '@playwright/test';
import base from './global.config';

export default defineConfig({
  ...base,
  use: {
    ...base.use,
    baseURL: "https://qa.myapp.com",
    extraHTTPHeaders: {
      "x-env": "qa"
    },
  }
});