import { Page } from '@playwright/test';
import { baselocators } from '../locators/baselocators';

export const URL_BASE = 'https://www.saucedemo.com';

// Clase base: todas las páginas comparten el objeto page y los locators de su pantalla
export class basepage<T extends baselocators = baselocators> {
  constructor(protected readonly page: Page, readonly locators: T) {}

  async irA(ruta = '/') {
    await this.page.goto(URL_BASE + ruta);
  }
}
