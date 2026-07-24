export class BaseDialog {
  selectors = {
    modal: () => cy.get('.modal-content'),
    cancelButton: () => cy.contains('.modal-content button', 'Cancel'),
    closeCrossButton: () => cy.get('.modal-content button[aria-label="Close"]'),
  };

  assertVisible() {
    this.selectors.modal().should('be.visible');
  }

  clickCancel() {
    this.selectors.cancelButton().click();
  }

  clickCloseCross() {
    this.selectors.closeCrossButton().click();
  }
}
