import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly inputUsuario: Locator;
  readonly inputClave: Locator;
  readonly botonLogin: Locator;
  readonly mensajeError: Locator;

  constructor(page: Page) {
    super(page);
    this.inputUsuario = page.locator('[data-test="username"]');
    this.inputClave = page.locator('[data-test="password"]');
    this.botonLogin = page.locator('[data-test="login-button"]');
    this.mensajeError = page.locator('[data-test="error"]');
  }

  async abrir() {
    await this.irA('/');
  }

  async iniciarSesion(usuario: string, clave: string) {
    await this.inputUsuario.fill(usuario);
    await this.inputClave.fill(clave);
    await this.botonLogin.click();
  }
}
