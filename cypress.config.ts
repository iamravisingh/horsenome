import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:4173",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
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
