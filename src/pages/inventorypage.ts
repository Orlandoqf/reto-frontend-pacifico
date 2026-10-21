import { Page } from '@playwright/test';
import { basepage } from './basepage';
import { inventorylocators } from '../locators/inventorylocators';

export class inventorypage extends basepage<inventorylocators> {
  constructor(page: Page) {
    super(page, new inventorylocators(page));
  }

  async agregarProducto(nombre: string) {
    await this.locators.botonAgregar(nombre).click();
  }

  async quitarProducto(nombre: string) {
    await this.locators.botonRemove(nombre).click();
  }

  async irAlCarrito() {
    await this.locators.iconoCarrito.click();
  }
}
