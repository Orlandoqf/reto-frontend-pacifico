# Reto Automatización QA Frontend - Playwright + Cucumber

Pruebas automatizadas de la tienda Sauce Demo (https://www.saucedemo.com/) usando Playwright con Cucumber y el patrón Page Object Model.

## Herramientas usadas

- Node.js 18 (o superior)
- Playwright 1.64
- Cucumber JS 13
- TypeScript 5 (con ts-node)

## Instalación

1. Clonar el repositorio
2. Abrir una terminal en la carpeta del proyecto
3. Instalar las dependencias y el navegador:

```bash
npm install
```

```bash
npx playwright install chromium
```

## Cómo ejecutar las pruebas

Ejecutar toda la suite (el navegador corre en modo headless):

```bash
npm test
```

Ejecutar viendo el navegador:

```bash
npm run test:headed
```

Para ejecutar solo los casos happypath o unhappypath:

```bash
npm run test:happypath
```

```bash
npm run test:unhappypath
```

Para ejecutar un solo feature (los tags `@login`, `@carrito` y `@compra` también sirven):

```bash
npx cucumber-js features/compra.feature
```

```bash
npx cucumber-js --tags @login
```

## Reporte

Después de ejecutar, los reportes se generan en:

- `reports/cucumber-report.html` (reporte para abrir en el navegador)
- `reports/cucumber-report.json`

Si un escenario falla, se adjunta una captura de pantalla en el reporte HTML.

## Estructura del proyecto

```
features                      -> escenarios en Gherkin (en español)
├── login.feature
├── carrito.feature
└── compra.feature
src
├── data
│   └── usuarios.ts           -> credenciales de prueba
├── pages                     -> Page Objects
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── steps                     -> step definitions, uno por feature
│   ├── login.steps.ts
│   ├── carrito.steps.ts
│   └── compra.steps.ts
└── support
    ├── world.ts              -> World de Cucumber (page y page objects del escenario)
    └── hooks.ts              -> abre/cierra el navegador y toma captura si falla
cucumber.js                   -> configuración de Cucumber
```

## Escenarios automatizados

| Feature | Escenario | Tipo |
|---|---|---|
| Login | Iniciar sesión con credenciales válidas (`standard_user`) | happypath |
| Login | El usuario bloqueado no puede iniciar sesión (`locked_out_user`) | unhappypath |
| Login | Credenciales inválidas: clave incorrecta, usuario inexistente, usuario vacío, clave vacía | unhappypath |
| Carrito | Agregar un producto desde la página de productos | happypath |
| Carrito | Ver los productos agregados en el carrito | happypath |
| Carrito | Quitar un producto del carrito | happypath |
| Compra | Completar la compra hasta la confirmación | happypath |
| Compra | Checkout sin nombre, sin apellido y sin código postal | unhappypath |

En total son 13 escenarios. El informe con la estrategia está en [INFORME.md](INFORME.md).
