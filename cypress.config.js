const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  env: {
    basicAuth: {
      username: 'guest',
      password: 'welcome2qauto',
    },
  },
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
    baseUrl: 'https://qauto.forstudy.space',
    specPattern: 'cypress/e2e/**/*.cy.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
