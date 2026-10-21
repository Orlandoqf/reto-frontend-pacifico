import { Locator, Page } from '@playwright/test';
import { baselocators } from './baselocators';

export class inventorylocators extends baselocators {
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
  producto(nombre: string): Locator {
    return this.productos.filter({ hasText: nombre });
  }

  botonAgregar(nombre: string): Locator {
    return this.producto(nombre).getByRole('button', { name: 'Add to cart' });
  }

  botonRemove(nombre: string): Locator {
    return this.producto(nombre).getByRole('button', { name: 'Remove' });
  }
}
