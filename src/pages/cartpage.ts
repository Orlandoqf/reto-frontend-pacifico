import { Page } from '@playwright/test';
import { basepage } from './basepage';
import { cartlocators } from '../locators/cartlocators';

export class cartpage extends basepage<cartlocators> {
  constructor(page: Page) {
    super(page, new cartlocators(page));
  }

  async irACheckout() {
    await this.locators.botonCheckout.click();
  }
}
