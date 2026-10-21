import { Page } from '@playwright/test';
import { basepage } from './basepage';
import { loginlocators } from '../locators/loginlocators';

export class loginpage extends basepage<loginlocators> {
  constructor(page: Page) {
    super(page, new loginlocators(page));
  }

  async abrir() {
    await this.irA('/');
  }

  async iniciarSesion(usuario: string, clave: string) {
    await this.locators.inputUsuario.fill(usuario);
    await this.locators.inputClave.fill(clave);
    await this.locators.botonLogin.click();
  }
}
