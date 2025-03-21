import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../tests',
  fullyParallel: true, 
  reporter: 'html', // Gera um relatório em HTML
  use: {
    baseURL: 'https://www.saucedemo.com/', 
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }, 
    },
  ],
});
