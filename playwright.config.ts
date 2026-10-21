import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

// Indica a src/support/bdd.ts que registre los steps en playwright-bdd
process.env.BDD_RUNNER = 'playwright';

// Convierte los .feature en tests de Playwright (se generan en .features-gen con npx bddgen)
const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: ['src/steps/**/*.ts', 'src/playwright/fixtures.ts'],
  language: 'es',
});

export default defineConfig({
  testDir,
  timeout: 30 * 1000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    headless: process.env.HEADLESS !== 'false',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
