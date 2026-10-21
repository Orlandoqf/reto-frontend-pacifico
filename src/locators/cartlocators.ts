import { Locator, Page } from '@playwright/test';
import { baselocators } from './baselocators';

export class cartlocators extends baselocators {
  readonly items: Locator;
  readonly nombresItems: Locator;
  readonly botonCheckout: Locator;

  constructor(page: Page) {
    super(page);
    this.items = page.locator('[data-test="inventory-item"]');
    this.nombresItems = page.locator('[data-test="inventory-item-name"]');
    this.botonCheckout = page.locator('[data-test="checkout"]');
  }
}
