import type { DataTable } from '@cucumber/cucumber';
import { When, Then } from '../support/bdd';
import { expect } from '@playwright/test';
import { escenario } from '../support/escenario';

When('agrega el producto {string} al carrito', async function (this: escenario, producto: string) {
  await this.inventoryPage.agregarProducto(producto);
});

When('agrega los siguientes productos al carrito:', async function (this: escenario, tabla: DataTable) {
  for (const [producto] of tabla.raw()) {
    await this.inventoryPage.agregarProducto(producto);
  }
});

When('quita el producto {string} del carrito', async function (this: escenario, producto: string) {
  await this.inventoryPage.quitarProducto(producto);
});

When('va al carrito', async function (this: escenario) {
  await this.inventoryPage.irAlCarrito();
  await expect(this.cartPage.locators.titulo).toHaveText('Your Cart');
});

Then('el contador del carrito muestra {string}', async function (this: escenario, cantidad: string) {
  await expect(this.inventoryPage.locators.contadorCarrito).toHaveText(cantidad);
});

Then('el contador del carrito no se muestra', async function (this: escenario) {
  await expect(this.inventoryPage.locators.contadorCarrito).toBeHidden();
});

Then('el producto {string} muestra el botón {string}', async function (this: escenario, producto: string, boton: string) {
  await expect(this.inventoryPage.locators.botonRemove(producto)).toHaveText(boton);
});

Then('el carrito contiene los productos:', async function (this: escenario, tabla: DataTable) {
  const esperados = tabla.raw().map(([producto]) => producto);
  await expect(this.cartPage.locators.items).toHaveCount(esperados.length);
  await expect(this.cartPage.locators.nombresItems).toHaveText(esperados);
});
