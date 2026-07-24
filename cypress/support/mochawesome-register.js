/// <reference types="cypress" />
const addContext = require('mochawesome/addContext');

const screenshotsFolder = Cypress.config('screenshotsFolder');
const FULL_FLOW_VIDEO_STEP = 'Step 7: Submit expense and verify it is displayed';

Cypress.Screenshot.defaults({
  onAfterScreenshot(_el, details) {
    saveScreenshotReference(details);
  },
});

Cypress.on('test:after:run', (test) => {
  // Attach the full-flow video only to the last step
  if (Cypress.config('video') && test.title === FULL_FLOW_VIDEO_STEP) {
    addContext(
      { test },
      {
        title: 'cypress-mochawesome-reporter-videos-' + test.state,
        value: Cypress.spec.relative,
      },
    );
  }

  if (!Cypress.Mochawesome) {
    return;
  }

  Cypress.Mochawesome.attempts.push(Cypress.Mochawesome.currentAttemptScreenshots);
  Cypress.Mochawesome.currentAttemptScreenshots = [];

  if (test.final) {
    addContext(
      { test },
      {
        title: 'cypress-mochawesome-reporter-screenshots',
        value: Cypress.Mochawesome.attempts,
      },
    );

    Cypress.Mochawesome.context.forEach((ctx) => {
      addContext({ test }, ctx);
    });

    Cypress.Mochawesome = undefined;
  }
});

Cypress.Commands.add('addTestContext', (context) => {
  if (!Cypress.Mochawesome) {
    Cypress.Mochawesome = createMochawesomeObject();
  }

  Cypress.Mochawesome.context.push(context);
});

function saveScreenshotReference(details) {
  const normalizedScreenshotPath = details.path.replace(screenshotsFolder, '');

  if (!Cypress.Mochawesome) {
    Cypress.Mochawesome = createMochawesomeObject();
  }

  Cypress.Mochawesome.currentAttemptScreenshots.push(normalizedScreenshotPath);
}

function createMochawesomeObject() {
  return {
    currentAttemptScreenshots: [],
    attempts: [],
    context: [],
  };
}
