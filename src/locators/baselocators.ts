import { Locator, Page } from '@playwright/test';

// Locators comunes a todas las páginas
export class baselocators {
  readonly titulo: Locator;

  constructor(protected readonly page: Page) {
    this.titulo = page.locator('[data-test="title"]');
  }
}
