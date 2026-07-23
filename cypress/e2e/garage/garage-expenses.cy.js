import { GaragePage, ExpensesPage } from '../../support/poms';

describe('Garage and Fuel expenses', { testIsolation: false }, () => {
  const garagePage = new GaragePage();
  const expensesPage = new ExpensesPage();

  const car = {
    brand: 'Audi',
    model: 'TT',
    name: 'Audi TT',
  };

  const mileage = Date.now() % 100000;
  const expense = {
    mileage: mileage + 50,
    liters: 25,
    totalCost: 100,
  };

  before(() => {
    cy.env(['defaultUserCreds']).then(({ defaultUserCreds }) => {
      cy.login(defaultUserCreds.username, defaultUserCreds.password);
      garagePage.open();
    });
  });

  it('Step 1: Open Add car dialog', () => {
    // Opens Add car modal on Garage page and checks that dialog is visible
    cy.testDescription(
      'Opens Add car modal on Garage page and checks that dialog is visible',
    );

    garagePage.clickAddCar();
    garagePage.addCarDialog.assertVisible();
  });

  it('Step 2: Select brand, model and mileage', () => {
    // Fills car creation form: brand, model and mileage
    cy.testDescription(
      'Fills car creation form with brand, model and mileage',
    );

    garagePage.addCarDialog.selectBrand(car.brand);
    garagePage.addCarDialog.selectors
      .modelSelect()
      .find('option')
      .should('have.length.greaterThan', 1);
    garagePage.addCarDialog.selectModel(car.model);
    garagePage.addCarDialog.fillMileage(mileage);
  });

  it('Step 3: Submit car form and verify car is visible', () => {
    // Submits Add car form and verifies the new car appears in Garage
    cy.testDescription(
      'Submits Add car form and verifies the new car appears in Garage',
    );

    garagePage.addCarDialog.clickAdd();
    garagePage.assertCarVisible(car.name);
  });

  it('Step 4: Open Fuel expenses page', () => {
    // Navigates from Garage to Fuel expenses section
    cy.testDescription(
      'Navigates from Garage to Fuel expenses section',
    );

    garagePage.openFuelExpenses();
    expensesPage.selectors.pageTitle().should('be.visible');
  });

  it('Step 5: Open Add an expense dialog', () => {
    // Opens Add an expense modal on Fuel expenses page
    cy.testDescription(
      'Opens Add an expense modal on Fuel expenses page',
    );

    expensesPage.clickAddExpense();
    expensesPage.addExpenseDialog.assertVisible();
  });

  it('Step 6: Fill expense data for the created car', () => {
    // Fills expense form for the created car: mileage, liters and total cost
    cy.testDescription(
      'Fills expense form for the created car: mileage, liters and total cost',
    );

    expensesPage.addExpenseDialog.selectCar(car.name);
    expensesPage.addExpenseDialog.fillMileage(expense.mileage);
    expensesPage.addExpenseDialog.fillLiters(expense.liters);
    expensesPage.addExpenseDialog.fillTotalCost(expense.totalCost);
  });

  it('Step 7: Submit expense and verify it is displayed', () => {
    // Submits expense form and verifies the new expense row is displayed
    cy.testDescription(
      'Submits expense form and verifies the new expense row is displayed',
    );

    expensesPage.addExpenseDialog.clickAdd();
    expensesPage.assertExpenseVisible({
      liters: expense.liters,
      totalCost: expense.totalCost,
    });
  });
});
