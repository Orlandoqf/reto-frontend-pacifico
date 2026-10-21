import { Locator, Page } from '@playwright/test';

export const URL_BASE = 'https://www.saucedemo.com';

// Clase base: todas las páginas comparten el objeto page y el título
export class BasePage {
  readonly titulo: Locator;

  constructor(protected readonly page: Page) {
    this.titulo = page.locator('[data-test="title"]');
  }

  async irA(ruta = '/') {
    await this.page.goto(URL_BASE + ruta);
  }
}
