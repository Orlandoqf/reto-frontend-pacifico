import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productos: Locator;
  readonly contadorCarrito: Locator;
  readonly iconoCarrito: Locator;

  constructor(page: Page) {
    super(page);
    this.productos = page.locator('[data-test="inventory-item"]');
    this.contadorCarrito = page.locator('[data-test="shopping-cart-badge"]');
    this.iconoCarrito = page.locator('[data-test="shopping-cart-link"]');
  }

  // Busca la tarjeta del producto por su nombre
  private producto(nombre: string): Locator {
    return this.productos.filter({ hasText: nombre });
  }

  botonRemove(nombre: string): Locator {
    return this.producto(nombre).getByRole('button', { name: 'Remove' });
  }

  async agregarProducto(nombre: string) {
    await this.producto(nombre).getByRole('button', { name: 'Add to cart' }).click();
  }

  async quitarProducto(nombre: string) {
    await this.botonRemove(nombre).click();
  }

  async irAlCarrito() {
    await this.iconoCarrito.click();
  }
}
