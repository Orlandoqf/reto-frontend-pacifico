import { Page } from '@playwright/test';
import { test as base, createBdd } from 'playwright-bdd';
import { escenario } from '../support/escenario';
import { loginpage } from '../pages/loginpage';
import { inventorypage } from '../pages/inventorypage';
import { cartpage } from '../pages/cartpage';
import { checkoutpage } from '../pages/checkoutpage';

// Equivale al customworld de Cucumber: Playwright crea un page nuevo por escenario
class playwrightworld implements escenario {
  readonly loginPage: loginpage;
  readonly inventoryPage: inventorypage;
  readonly cartPage: cartpage;
  readonly checkoutPage: checkoutpage;

  constructor(readonly page: Page) {
    this.loginPage = new loginpage(page);
    this.inventoryPage = new inventorypage(page);
    this.cartPage = new cartpage(page);
    this.checkoutPage = new checkoutpage(page);
  }
}

export const test = base.extend<{ world: playwrightworld }>({
  world: async ({ page }, use) => {
    await use(new playwrightworld(page));
  },
});

// worldFixture permite escribir los steps con this, igual que en Cucumber
export const bdd = createBdd(test, { worldFixture: 'world' });
