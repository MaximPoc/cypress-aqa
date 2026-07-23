const { defineConfig } = require("cypress");
const path = require("path");
const fs = require("fs");
const { beforeRunHook, afterRunHook } = require("cypress-mochawesome-reporter/lib");

const getConfig = (env) => {
  const configPath = path.resolve(
    process.cwd(),
    `cypress/fixtures/config/config.${env}.json`,
  );
  return JSON.parse(fs.readFileSync(configPath, "utf-8"));
};

module.exports = defineConfig({
  allowCypressEnv: false,
  env: {
    TEST_ENV: "dev",
  },
  expose: {
    basicAuth: {
      username: "guest",
      password: "welcome2qauto",
    },
  },
  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,
  defaultBrowser: "chrome",
  viewportHeight: 1080,
  viewportWidth: 1512,
  retries: {
    runMode: 3,
    openMode: 1,
  },
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress AQA Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,
    ignoreVideos: false,
    code: true,
    showHooks: "failed",
    reportDir: "cypress/reports/dev",
    reportFilename: "report-[status]-[datetime]",
    timestamp: "yyyy-mm-dd_HH-MM-ss",
  },
  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      // allureWriter(on, config); // allure reporter setup - needs `allowCypressEnv: true`
      // addMatchImageSnapshotPlugin(on); // snapshot testing setup - needs `allowCypressEnv: true`

      const testEnv = process.env.TEST_ENV || config.env.TEST_ENV || "dev";
      const configValue = getConfig(testEnv);

      console.log(`Loaded config for ${testEnv}:`, configValue);

      config.env = { ...config.env, ...configValue.env, TEST_ENV: testEnv };
      config = { ...config, ...configValue };

      config.reporterOptions = {
        ...config.reporterOptions,
        overwrite: false,
        ignoreVideos: false,
        code: true,
        showHooks: "failed",
        reportDir: `cypress/reports/${testEnv}`,
        reportFilename: `report-${testEnv}-[status]-[datetime]`,
        timestamp: "yyyy-mm-dd_HH-MM-ss",
        reportPageTitle: `Cypress AQA Report [${testEnv}]`,
      };

      // One full-flow video per env (not attached to every report step)
      config.videosFolder = `cypress/videos/${testEnv}`;

      on("before:run", async (details) => {
        await beforeRunHook(details);
      });

      on("after:run", async (results) => {
        await afterRunHook(results);

        const videosFolder = path.resolve(config.videosFolder);
        const reportDir = path.resolve(config.reporterOptions.reportDir);
        const sourceVideo = path.join(videosFolder, "garage-expenses.cy.js.mp4");
        const targetVideo = path.join(reportDir, `full-flow-${testEnv}.mp4`);

        if (fs.existsSync(sourceVideo)) {
          fs.mkdirSync(reportDir, { recursive: true });
          fs.copyFileSync(sourceVideo, targetVideo);
          console.log(`Full-flow video saved to ${targetVideo}`);
        }
      });

      return config;
    },
  },
});
