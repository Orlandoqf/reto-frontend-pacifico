# Reto Automatización QA Frontend - Playwright + Cucumber

Pruebas automatizadas de la tienda Sauce Demo (https://www.saucedemo.com/) usando Playwright con Cucumber y el patrón Page Object Model.

## Herramientas usadas

- Node.js 18 (o superior)
- Playwright 1.64
- Cucumber JS 13
- playwright-bdd 9 (para ejecutar los features con el runner de Playwright)
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
npx cucumber-js --tags "@login"
```

> En PowerShell el tag debe ir entre comillas: sin ellas, `@login` se interpreta como una variable (splatting) y el comando falla.

### Ejecutar con Playwright (playwright-bdd)

Los mismos features y steps también se pueden ejecutar con el runner de Playwright. `bddgen` convierte los `.feature` en tests de Playwright (en `.features-gen`) y luego `playwright test` los ejecuta:

```bash
npm run test:pw
```

```bash
npm run test:pw:headed
npm run test:pw:happypath
npm run test:pw:unhappypath
```

O directamente con `npx` (los tags se filtran con `--grep`):

```powershell
npx bddgen; npx playwright test --grep "@happypath"
```

> Hay que ejecutar `npx bddgen` antes de `npx playwright test` cada vez que cambie un `.feature` o un step.

## Reporte

Con Cucumber (`npm test`), los reportes se generan en:

- `reports/cucumber-report.html` (reporte para abrir en el navegador)
- `reports/cucumber-report.json`

Si un escenario falla, se adjunta una captura de pantalla en el reporte HTML.

Con Playwright (`npm run test:pw`), el reporte HTML de Playwright se genera en `playwright-report/` y se abre con:

```bash
npm run report:pw
```

Si un escenario falla, el reporte incluye la captura de pantalla y la traza (trace), que se puede abrir desde el mismo reporte para ver la ejecución paso a paso.

## Estructura del proyecto

```
features                      -> escenarios en Gherkin (en español)
├── login.feature
├── carrito.feature
└── compra.feature
src
├── data
│   └── usuarios.ts           -> credenciales de prueba
├── locators                  -> localizadores de cada pantalla
│   ├── baselocators.ts
│   ├── loginlocators.ts
│   ├── inventorylocators.ts
│   ├── cartlocators.ts
│   └── checkoutlocators.ts
├── pages                     -> Page Objects (solo acciones)
│   ├── basepage.ts
│   ├── loginpage.ts
│   ├── inventorypage.ts
│   ├── cartpage.ts
│   └── checkoutpage.ts
├── playwright
│   └── fixtures.ts           -> World de playwright-bdd (equivalente a world.ts)
├── steps                     -> step definitions, uno por feature (sirven para los dos runners)
│   ├── login.steps.ts
│   ├── carrito.steps.ts
│   └── compra.steps.ts
└── support
    ├── bdd.ts                -> registra los steps en Cucumber o en playwright-bdd
    ├── escenario.ts          -> lo que los steps usan del escenario (page y page objects)
    ├── world.ts              -> World de Cucumber (page y page objects del escenario)
    └── hooks.ts              -> abre/cierra el navegador y toma captura si falla
cucumber.js                   -> configuración de Cucumber
playwright.config.ts          -> configuración de Playwright y playwright-bdd
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
