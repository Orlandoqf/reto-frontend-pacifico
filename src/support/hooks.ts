import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import { CustomWorld } from './world';

setDefaultTimeout(30 * 1000);

let browser: Browser;

// Se abre un solo navegador para toda la ejecución
BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
});

// Cada escenario usa su propio contexto, así no se comparte la sesión ni el carrito
Before(async function (this: CustomWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
  this.crearPaginas();
});

After(async function (this: CustomWorld, { result }) {
  // Si el escenario falla se adjunta una captura al reporte
  if (result?.status === Status.FAILED) {
    const captura = await this.page.screenshot({ fullPage: true });
    this.attach(captura, 'image/png');
  }
  await this.context.close();
});

AfterAll(async function () {
  await browser.close();
});
