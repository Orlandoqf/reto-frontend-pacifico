# Informe - Estrategia de automatización

## 1. Qué se probó

Se automatizó la historia de usuario del reto: iniciar sesión, agregar productos al carrito y completar una compra en Sauce Demo.

Antes de automatizar recorrí la página manualmente con los dos usuarios del reto y revisé los mensajes que muestra cada pantalla. Algunas cosas que vi:

- Los elementos tienen el atributo `data-test`, así que lo usé para los localizadores (son más estables que las clases CSS o los XPath).
- El usuario `locked_out_user` no entra y muestra el mensaje "Sorry, this user has been locked out.".
- El checkout tiene 3 pantallas: datos del cliente, resumen y confirmación. Los 3 campos de datos son obligatorios.

## 2. Cobertura de los criterios de aceptación

| Criterio | Dónde se prueba |
|---|---|
| 1. Iniciar sesión con credenciales válidas | `login.feature` - escenario con `standard_user` |
| 2. No iniciar sesión con credenciales inválidas | `login.feature` - `locked_out_user` + esquema con 4 casos inválidos |
| 3. Agregar un producto desde la página de productos | `carrito.feature` - agregar un producto |
| 4. Ver los productos agregados en el carrito | `carrito.feature` - ver productos en el carrito |
| 5. Completar la compra hasta la confirmación | `compra.feature` - completar la compra |

Además agregué escenarios extra: quitar un producto del carrito y validar los campos obligatorios del checkout.

## 3. Patrón de diseño: Page Object Model

Cada pantalla de la aplicación tiene dos clases: una con sus localizadores en `src/locators` y otra con sus acciones en `src/pages`.

- `src/locators`: `baselocators` tiene el título que comparten todas las pantallas; `loginlocators`, `inventorylocators`, `cartlocators` y `checkoutlocators` heredan de ella y definen los localizadores de su pantalla.
- `src/pages`: `basepage` es la clase padre con el `page` de Playwright, la URL base y los localizadores de la pantalla (`locators`). `loginpage`, `inventorypage`, `cartpage` y `checkoutpage` solo tienen los métodos con las acciones (por ejemplo `iniciarSesion()`, `agregarProducto()`, `llenarDatos()`).

Así los step definitions no tienen selectores: llaman a los métodos de las páginas y validan usando `pagina.locators`. Si cambia un selector, solo se cambia en su clase de `src/locators`.

## 4. Cómo usé Cucumber

- Los features están escritos en **Gherkin en español** (`# language: es`) para que cualquier persona del equipo los pueda leer.
- Usé **Antecedentes** para no repetir pasos (por ejemplo, iniciar sesión antes de los escenarios del carrito y de la compra).
- Usé **Esquema del escenario** con **Ejemplos** para los casos de login inválido y de checkout sin datos, así no repito el mismo escenario varias veces.
- Usé **tablas de datos** para agregar y validar varios productos en el carrito.
- Usé tags: `@happypath` / `@unhappypath` por tipo de caso y `@login` / `@carrito` / `@compra` por feature.
- El **World** de Cucumber (`src/support/world.ts`) guarda la página y los page objects de cada escenario para compartirlos entre los steps.
- Los **hooks** (`src/support/hooks.ts`) abren el navegador una vez y crean un contexto nuevo por escenario, así cada escenario empieza limpio (sin sesión ni carrito de otro escenario). Si un escenario falla se toma una captura y se adjunta al reporte.
- Los mismos features y steps también se pueden ejecutar con el runner de Playwright gracias a **playwright-bdd** (`npm run test:pw`), lo que da acceso al reporte HTML de Playwright y a las trazas de los escenarios que fallan. `src/support/bdd.ts` registra los steps en Cucumber o en playwright-bdd según cuál los ejecute, así no hay steps duplicados.

## 5. Validaciones

Para las validaciones usé el `expect` de Playwright, que espera automáticamente a que el elemento cumpla la condición. Por eso no usé esperas fijas (`waitForTimeout`). Se valida:

- La URL y el título de cada pantalla.
- Los mensajes de error exactos.
- El contador del carrito y el cambio del botón a "Remove".
- Los nombres de los productos en el carrito y en el resumen.
- Que el resumen muestre el total y el mensaje final "Thank you for your order!".

## 6. Resultado

Los 13 escenarios pasan (89 steps) en unos 11 segundos con Chromium en modo headless.
