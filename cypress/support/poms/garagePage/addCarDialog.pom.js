import { BaseDialog } from '../base/baseDialog.pom';

export class AddCarDialog extends BaseDialog {
  selectors = {
    ...this.selectors,
    brandSelect: () => cy.get('#addCarBrand'),
    modelSelect: () => cy.get('#addCarModel'),
    mileageInput: () => cy.get('#addCarMileage'),
    addButton: () => cy.contains('.modal-content button', 'Add'),
  };

  selectBrand(brand) {
    this.selectors.brandSelect().select(brand);
  }

  selectModel(model) {
    this.selectors.modelSelect().select(model);
  }

  fillMileage(mileage) {
    this.selectors.mileageInput().clear().type(String(mileage));
  }

  clickAdd() {
    this.selectors.addButton().should('be.enabled').click();
  }

  addCar({ brand, model, mileage }) {
    this.assertVisible();
    this.selectBrand(brand);
    this.selectors.modelSelect().find('option').should('have.length.greaterThan', 1);
    this.selectModel(model);
    this.fillMileage(mileage);
    this.clickAdd();
  }
}
