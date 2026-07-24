// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

const addContext = require('mochawesome/addContext');

Cypress.Commands.add('testDescription', (description) => {
  cy.once('test:after:run', (test) => {
    addContext({ test }, { title: 'Description', value: description });
  });
});

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, {
    auth: Cypress.expose('basicAuth'),
    ...options,
  });
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    // turn off original log
    options.log = false
    // create our own log with masked message
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    })
  }

  return originalFn(element, text, options)
})

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/');
  cy.get('body').then(($body) => {
    if ($body.find('.header_signin').length) {
      cy.get('.header_signin').click();
      cy.get('.modal-content').should('be.visible');
      cy.get('#signinEmail').type(email);
      cy.get('#signinPassword').type(password, { sensitive: true });
      cy.get('.modal-content').contains('button', 'Login').click();
    }
  });
  cy.url().should('include', '/panel/garage');
});
