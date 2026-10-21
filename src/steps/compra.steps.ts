import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('inicia el checkout', async function (this: CustomWorld) {
  await this.cartPage.irACheckout();
  await expect(this.checkoutPage.titulo).toHaveText('Checkout: Your Information');
});

When('ingresa sus datos: nombre {string}, apellido {string} y código postal {string}',
  async function (this: CustomWorld, nombre: string, apellido: string, codigoPostal: string) {
    await this.checkoutPage.llenarDatos(nombre, apellido, codigoPostal);
  }
);

Then('el resumen de la compra muestra el producto {string}', async function (this: CustomWorld, producto: string) {
  await expect(this.checkoutPage.titulo).toHaveText('Checkout: Overview');
  await expect(this.checkoutPage.nombresItems).toHaveText([producto]);
});

Then('el resumen muestra el total', async function (this: CustomWorld) {
  await expect(this.checkoutPage.total).toHaveText(/Total: \$\d+\.\d{2}/);
});

When('finaliza la compra', async function (this: CustomWorld) {
  await this.checkoutPage.finalizarCompra();
});

Then('se muestra el mensaje de confirmación {string}', async function (this: CustomWorld, mensaje: string) {
  await expect(this.checkoutPage.titulo).toHaveText('Checkout: Complete!');
  await expect(this.checkoutPage.mensajeConfirmacion).toHaveText(mensaje);
});

Then('se muestra el mensaje de error del checkout {string}', async function (this: CustomWorld, mensaje: string) {
  await expect(this.checkoutPage.mensajeError).toHaveText(mensaje);
  await expect(this.checkoutPage.titulo).toHaveText('Checkout: Your Information');
});
