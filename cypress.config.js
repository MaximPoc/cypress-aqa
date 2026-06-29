const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,
  defaultBrowser: 'chrome',
  viewportHeight: 1080,
  viewportWidth: 1512,
  retries: {
    runMode: 3,
    openMode: 1,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      this.baseUrl = 'https://example.cypress.io';
      this.specPattern = 'cypress/e2e/**/*.cy.js';
    },
  },
});
