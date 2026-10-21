import { Page } from '@playwright/test';
import { loginpage } from '../pages/loginpage';
import { inventorypage } from '../pages/inventorypage';
import { cartpage } from '../pages/cartpage';
import { checkoutpage } from '../pages/checkoutpage';

// Lo que los steps usan de cada escenario, sin importar si lo ejecuta Cucumber o Playwright
export interface escenario {
  page: Page;
  loginPage: loginpage;
  inventoryPage: inventorypage;
  cartPage: cartpage;
  checkoutPage: checkoutpage;
}
