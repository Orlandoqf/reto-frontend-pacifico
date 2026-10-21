import { Locator, Page } from '@playwright/test';
import { baselocators } from './baselocators';

export class loginlocators extends baselocators {
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
}
