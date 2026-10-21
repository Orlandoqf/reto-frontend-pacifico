import { Page } from '@playwright/test';
import { basepage } from './basepage';
import { checkoutlocators } from '../locators/checkoutlocators';

// Cubre los 3 pasos del checkout: datos del cliente, resumen y confirmación
export class checkoutpage extends basepage<checkoutlocators> {
  constructor(page: Page) {
    super(page, new checkoutlocators(page));
  }

  async llenarDatos(nombre: string, apellido: string, codigoPostal: string) {
    await this.locators.inputNombre.fill(nombre);
    await this.locators.inputApellido.fill(apellido);
    await this.locators.inputCodigoPostal.fill(codigoPostal);
    await this.locators.botonContinuar.click();
  }

  async finalizarCompra() {
    await this.locators.botonFinalizar.click();
  }
}
