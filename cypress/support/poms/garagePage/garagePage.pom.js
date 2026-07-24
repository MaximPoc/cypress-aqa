import { BasePage } from '../base/basePage.pom';
import { AddCarDialog } from './addCarDialog.pom';

export class GaragePage extends BasePage {
  addCarDialog = new AddCarDialog();

  selectors = {
    ...this.selectors,
    pageTitle: () => cy.contains('h1', 'Garage'),
    addCarButton: () => cy.contains('button', 'Add car'),
    carItem: (carName) => cy.contains('.car-item', carName),
    fuelExpensesNav: () => cy.contains('a', 'Fuel expenses'),
  };

  open() {
    this.visit('/panel/garage');
    this.selectors.pageTitle().should('be.visible');
  }

  clickAddCar() {
    this.selectors.addCarButton().click();
    return this.addCarDialog;
  }

  addCar({ brand, model, mileage }) {
    this.clickAddCar().addCar({ brand, model, mileage });
  }

  assertCarVisible(carName) {
    this.selectors.carItem(carName).should('be.visible');
  }

  openFuelExpenses() {
    this.selectors.fuelExpensesNav().click();
  }
}
