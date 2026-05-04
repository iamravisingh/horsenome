import { defineConfig } from "cypress";
import { devConfig } from "./cypress/config/dev";
import { prodConfig } from "./cypress/config/prod";

const target = process.env.CYPRESS_TARGET ?? "local";
const resolvedTargetConfig = target === "prod" ? prodConfig : devConfig;
const baseUrl = process.env.CYPRESS_BASE_URL
  ?? resolvedTargetConfig.baseUrl;

export default defineConfig({
  e2e: {
    baseUrl,
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
  },
  env: {
    target,
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
  viewportWidth: 1512,
  viewportHeight: 830,
  video: false,
  screenshotOnRunFailure: true,
});
