import { When, Then } from '../support/bdd';
import { expect } from '@playwright/test';
import { escenario } from '../support/escenario';

When('inicia el checkout', async function (this: escenario) {
  await this.cartPage.irACheckout();
  await expect(this.checkoutPage.locators.titulo).toHaveText('Checkout: Your Information');
});

When('ingresa sus datos: nombre {string}, apellido {string} y código postal {string}',
  async function (this: escenario, nombre: string, apellido: string, codigoPostal: string) {
    await this.checkoutPage.llenarDatos(nombre, apellido, codigoPostal);
  }
);

Then('el resumen de la compra muestra el producto {string}', async function (this: escenario, producto: string) {
  await expect(this.checkoutPage.locators.titulo).toHaveText('Checkout: Overview');
  await expect(this.checkoutPage.locators.nombresItems).toHaveText([producto]);
});

Then('el resumen muestra el total', async function (this: escenario) {
  await expect(this.checkoutPage.locators.total).toHaveText(/Total: \$\d+\.\d{2}/);
});

When('finaliza la compra', async function (this: escenario) {
  await this.checkoutPage.finalizarCompra();
});

Then('se muestra el mensaje de confirmación {string}', async function (this: escenario, mensaje: string) {
  await expect(this.checkoutPage.locators.titulo).toHaveText('Checkout: Complete!');
  await expect(this.checkoutPage.locators.mensajeConfirmacion).toHaveText(mensaje);
});

Then('se muestra el mensaje de error del checkout {string}', async function (this: escenario, mensaje: string) {
  await expect(this.checkoutPage.locators.mensajeError).toHaveText(mensaje);
  await expect(this.checkoutPage.locators.titulo).toHaveText('Checkout: Your Information');
});
