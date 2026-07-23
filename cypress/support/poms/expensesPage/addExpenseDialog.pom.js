import { BaseDialog } from '../base/baseDialog.pom';

export class AddExpenseDialog extends BaseDialog {
  selectors = {
    ...this.selectors,
    carSelect: () => cy.get('#addExpenseCar'),
    dateInput: () => cy.get('#addExpenseDate'),
    mileageInput: () => cy.get('#addExpenseMileage'),
    litersInput: () => cy.get('#addExpenseLiters'),
    totalCostInput: () => cy.get('#addExpenseTotalCost'),
    addButton: () => cy.contains('.modal-content button', 'Add'),
  };

  selectCar(car) {
    this.selectors.carSelect()
      .find('option')
      .contains(car)
      .first()
      .then(($option) => {
        this.selectors.carSelect().select($option.val());
      });
  }

  fillMileage(mileage) {
    this.selectors.mileageInput().clear().type(String(mileage));
  }

  fillLiters(liters) {
    this.selectors.litersInput().clear().type(String(liters));
  }

  fillTotalCost(totalCost) {
    this.selectors.totalCostInput().clear().type(String(totalCost));
  }

  clickAdd() {
    this.selectors.addButton().should('be.enabled').click();
  }

  addExpense({ car, mileage, liters, totalCost }) {
    this.assertVisible();
    if (car) {
      this.selectCar(car);
    }
    this.fillMileage(mileage);
    this.fillLiters(liters);
    this.fillTotalCost(totalCost);
    this.clickAdd();
  }
}
