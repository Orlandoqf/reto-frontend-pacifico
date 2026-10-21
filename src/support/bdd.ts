import { escenario } from './escenario';

type definirPaso = (expresion: string, fn: (this: escenario, ...args: any[]) => Promise<void>) => void;

// Los mismos steps sirven para los dos runners: playwright.config.ts marca BDD_RUNNER=playwright
// y entonces se registran en playwright-bdd; si no, se registran en Cucumber
const registro = process.env.BDD_RUNNER === 'playwright'
  ? require('../playwright/fixtures').bdd
  : require('@cucumber/cucumber');

export const Given: definirPaso = registro.Given;
export const When: definirPaso = registro.When;
export const Then: definirPaso = registro.Then;
