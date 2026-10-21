import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { usuarios } from '../data/usuarios';

Given('que el usuario está en la página de login', async function (this: CustomWorld) {
  await this.loginPage.abrir();
  await expect(this.loginPage.botonLogin).toBeVisible();
});

// Step reutilizable para los features que necesitan empezar con sesión iniciada
Given('que el usuario {string} inició sesión', async function (this: CustomWorld, nombreUsuario: string) {
  const datos = usuarios[nombreUsuario];
  await this.loginPage.abrir();
  await this.loginPage.iniciarSesion(datos.usuario, datos.clave);
  await expect(this.page).toHaveURL(/inventory\.html/);
});

When('inicia sesión con el usuario {string} y la clave {string}', async function (this: CustomWorld, usuario: string, clave: string) {
  await this.loginPage.iniciarSesion(usuario, clave);
});

Then('se muestra la página de productos', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/inventory\.html/);
  await expect(this.inventoryPage.titulo).toHaveText('Products');
  await expect(this.inventoryPage.productos).toHaveCount(6);
});

Then('se muestra el mensaje de error {string}', async function (this: CustomWorld, mensaje: string) {
  await expect(this.loginPage.mensajeError).toHaveText(mensaje);
});

Then('el usuario sigue en la página de login', async function (this: CustomWorld) {
  await expect(this.page).not.toHaveURL(/inventory\.html/);
  await expect(this.loginPage.botonLogin).toBeVisible();
});
