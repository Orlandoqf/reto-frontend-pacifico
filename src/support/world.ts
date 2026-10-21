import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { loginpage } from '../pages/loginpage';
import { inventorypage } from '../pages/inventorypage';
import { cartpage } from '../pages/cartpage';
import { checkoutpage } from '../pages/checkoutpage';
import { escenario } from './escenario';

// El World guarda lo que comparten los steps de un mismo escenario
export class customworld extends World implements escenario {
  context!: BrowserContext;
  page!: Page;

  loginPage!: loginpage;
  inventoryPage!: inventorypage;
  cartPage!: cartpage;
  checkoutPage!: checkoutpage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  crearPaginas() {
    this.loginPage = new loginpage(this.page);
    this.inventoryPage = new inventorypage(this.page);
    this.cartPage = new cartpage(this.page);
    this.checkoutPage = new checkoutpage(this.page);
  }
}

setWorldConstructor(customworld);
