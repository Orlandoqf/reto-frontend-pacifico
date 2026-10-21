import { Given, When, Then } from '../support/bdd';
import { expect } from '@playwright/test';
import { escenario } from '../support/escenario';
import { usuarios } from '../data/usuarios';

Given('que el usuario está en la página de login', async function (this: escenario) {
  await this.loginPage.abrir();
  await expect(this.loginPage.locators.botonLogin).toBeVisible();
});

// Step reutilizable para los features que necesitan empezar con sesión iniciada
Given('que el usuario {string} inició sesión', async function (this: escenario, nombreUsuario: string) {
  const datos = usuarios[nombreUsuario];
  await this.loginPage.abrir();
  await this.loginPage.iniciarSesion(datos.usuario, datos.clave);
  await expect(this.page).toHaveURL(/inventory\.html/);
});

When('inicia sesión con el usuario {string} y la clave {string}', async function (this: escenario, usuario: string, clave: string) {
  await this.loginPage.iniciarSesion(usuario, clave);
});

Then('se muestra la página de productos', async function (this: escenario) {
  await expect(this.page).toHaveURL(/inventory\.html/);
  await expect(this.inventoryPage.locators.titulo).toHaveText('Products');
  await expect(this.inventoryPage.locators.productos).toHaveCount(6);
});

Then('se muestra el mensaje de error {string}', async function (this: escenario, mensaje: string) {
  await expect(this.loginPage.locators.mensajeError).toHaveText(mensaje);
});

Then('el usuario sigue en la página de login', async function (this: escenario) {
  await expect(this.page).not.toHaveURL(/inventory\.html/);
  await expect(this.loginPage.locators.botonLogin).toBeVisible();
});
