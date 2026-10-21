import { Locator, Page } from '@playwright/test';
import { baselocators } from './baselocators';

// Locators de los 3 pasos del checkout: datos del cliente, resumen y confirmación
export class checkoutlocators extends baselocators {
  readonly inputNombre: Locator;
  readonly inputApellido: Locator;
  readonly inputCodigoPostal: Locator;
  readonly botonContinuar: Locator;
  readonly mensajeError: Locator;
  readonly nombresItems: Locator;
  readonly total: Locator;
  readonly botonFinalizar: Locator;
  readonly mensajeConfirmacion: Locator;

  constructor(page: Page) {
    super(page);
    this.inputNombre = page.locator('[data-test="firstName"]');
    this.inputApellido = page.locator('[data-test="lastName"]');
    this.inputCodigoPostal = page.locator('[data-test="postalCode"]');
    this.botonContinuar = page.locator('[data-test="continue"]');
    this.mensajeError = page.locator('[data-test="error"]');
    this.nombresItems = page.locator('[data-test="inventory-item-name"]');
    this.total = page.locator('[data-test="total-label"]');
    this.botonFinalizar = page.locator('[data-test="finish"]');
    this.mensajeConfirmacion = page.locator('[data-test="complete-header"]');
  }
}
