import { BasePage } from '../base/basePage.pom';
import { AddExpenseDialog } from './addExpenseDialog.pom';

export class ExpensesPage extends BasePage {
  addExpenseDialog = new AddExpenseDialog();

  selectors = {
    ...this.selectors,
    pageTitle: () => cy.contains('h1', 'Fuel expenses'),
    addExpenseButton: () => cy.contains('button', 'Add an expense'),
    expenseRow: () => cy.get('tbody tr'),
    garageNav: () => cy.contains('a', 'Garage'),
  };

  open() {
    this.visit('/panel/expenses');
    this.selectors.pageTitle().should('be.visible');
  }

  clickAddExpense() {
    this.selectors.addExpenseButton().click();
    return this.addExpenseDialog;
  }

  addExpense({ car, mileage, liters, totalCost }) {
    this.clickAddExpense().addExpense({ car, mileage, liters, totalCost });
  }

  assertExpenseVisible({ liters, totalCost }) {
    this.selectors.expenseRow().should('contain', String(liters));
    this.selectors.expenseRow().should('contain', String(totalCost));
  }
}
