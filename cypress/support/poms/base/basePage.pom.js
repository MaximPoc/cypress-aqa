export class BasePage {
  selectors = {};

  visit(path = '/') {
    cy.visit(path);
  }

  clearCookies() {
    cy.clearCookies();
  }

  clearLocalStorage() {
    cy.clearLocalStorage();
  }
}
