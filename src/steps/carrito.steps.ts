import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('agrega el producto {string} al carrito', async function (this: CustomWorld, producto: string) {
  await this.inventoryPage.agregarProducto(producto);
});

When('agrega los siguientes productos al carrito:', async function (this: CustomWorld, tabla: DataTable) {
  for (const [producto] of tabla.raw()) {
    await this.inventoryPage.agregarProducto(producto);
  }
});

When('quita el producto {string} del carrito', async function (this: CustomWorld, producto: string) {
  await this.inventoryPage.quitarProducto(producto);
});

When('va al carrito', async function (this: CustomWorld) {
  await this.inventoryPage.irAlCarrito();
  await expect(this.cartPage.titulo).toHaveText('Your Cart');
});

Then('el contador del carrito muestra {string}', async function (this: CustomWorld, cantidad: string) {
  await expect(this.inventoryPage.contadorCarrito).toHaveText(cantidad);
});

Then('el contador del carrito no se muestra', async function (this: CustomWorld) {
  await expect(this.inventoryPage.contadorCarrito).toBeHidden();
});

Then('el producto {string} muestra el botón {string}', async function (this: CustomWorld, producto: string, boton: string) {
  await expect(this.inventoryPage.botonRemove(producto)).toHaveText(boton);
});

Then('el carrito contiene los productos:', async function (this: CustomWorld, tabla: DataTable) {
  const esperados = tabla.raw().map(([producto]) => producto);
  await expect(this.cartPage.items).toHaveCount(esperados.length);
  await expect(this.cartPage.nombresItems).toHaveText(esperados);
});
