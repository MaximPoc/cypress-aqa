const buildUniqueEmail = (baseEmail, prefix = 'aqa') => {
  const [localPart, domain] = baseEmail.split('@');
  return `${localPart}+${prefix}-${Date.now()}@${domain}`;
};

describe('Registration', () => {
  const openRegistrationForm = () => {
    cy.visit('/');
    cy.get('.header_signin').click();
    cy.get('.modal-content').should('be.visible');
    cy.contains('button', 'Registration').click();
    cy.get('.modal-header').should('contain', 'Registration');
  };

  const triggerFieldError = (selector, value = '') => {
    cy.get(selector).clear();
    if (value !== '') {
      cy.get(selector).type(value);
    }
    cy.get(selector).focus().blur();
  };

  beforeEach(() => {
    openRegistrationForm();
  });

  context('Name field validation', () => {
    it('should show error when Name is empty', () => {
      triggerFieldError('#signupName');
      cy.contains('p', 'Name required').should('be.visible');
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when Name is shorter than 2 characters', () => {
      triggerFieldError('#signupName', 'A');
      cy.contains('p', 'Name has to be from 2 to 20 characters long').should('be.visible');
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when Name is longer than 20 characters', () => {
      triggerFieldError('#signupName', 'A'.repeat(21));
      cy.contains('p', 'Name has to be from 2 to 20 characters long').should('be.visible');
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when Name is invalid', () => {
      triggerFieldError('#signupName', 'John1');
      cy.contains('p', 'Name is invalid').should('be.visible');
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Last name field validation', () => {
    it('should show error when Last name is empty', () => {
      triggerFieldError('#signupLastName');
      cy.contains('p', 'Last name required').should('be.visible');
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when Last name is shorter than 2 characters', () => {
      triggerFieldError('#signupLastName', 'D');
      cy.contains('p', 'Last name has to be from 2 to 20 characters long').should('be.visible');
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when Last name is longer than 20 characters', () => {
      triggerFieldError('#signupLastName', 'D'.repeat(21));
      cy.contains('p', 'Last name has to be from 2 to 20 characters long').should('be.visible');
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when Last name is invalid', () => {
      triggerFieldError('#signupLastName', 'Doe!');
      cy.contains('p', 'Last name is invalid').should('be.visible');
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Email field validation', () => {
    it('should show error when Email is empty', () => {
      triggerFieldError('#signupEmail');
      cy.contains('p', 'Email required').should('be.visible');
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when Email is incorrect', () => {
      triggerFieldError('#signupEmail', 'invalid-email');
      cy.contains('p', 'Email is incorrect').should('be.visible');
      cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Password field validation', () => {
    const passwordError =
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter';

    it('should show error when Password is empty', () => {
      triggerFieldError('#signupPassword');
      cy.contains('p', 'Password required').should('be.visible');
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when Password does not meet complexity rules', () => {
      cy.get('#signupPassword').type('qwerty', { sensitive: true }).blur();
      cy.contains('p', passwordError).should('be.visible');
      cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Re-enter password field validation', () => {
    it('should show error when Re-enter password is empty', () => {
      triggerFieldError('#signupRepeatPassword');
      cy.contains('p', 'Re-enter password required').should('be.visible');
      cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });

    it('should show error when passwords do not match', () => {
      cy.get('#signupPassword').type('Qwerty123', { sensitive: true });
      cy.get('#signupRepeatPassword').type('Qwerty321', { sensitive: true }).blur();
      cy.contains('p', 'Passwords do not match').should('be.visible');
      cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
  });

  context('Successful registration', () => {
    it('should register a new user with unique email and redirect to garage', () => {
      cy.env(['user']).then(({ user }) => {
        const email = buildUniqueEmail(user.email, 'reg');

        cy.get('#signupName').type(user.name);
        cy.get('#signupLastName').type(user.lastName);
        cy.get('#signupEmail').type(email);
        cy.get('#signupPassword').type(user.password, { sensitive: true });
        cy.get('#signupRepeatPassword').type(user.password, { sensitive: true });

        cy.get('.modal-content').contains('button', 'Register').should('be.enabled').click();

        cy.url().should('include', '/panel/garage');
        cy.get('h1').should('contain', 'Garage');
      });
    });
  });
});

describe('Login with custom command', () => {
  it('should login via UI using cy.login() with registered user credentials', () => {
    cy.env(['user']).then(({ user }) => {
      const email = buildUniqueEmail(user.email, 'login');

      cy.visit('/');
      cy.get('.header_signin').click();
      cy.contains('button', 'Registration').click();

      cy.get('#signupName').type(user.name);
      cy.get('#signupLastName').type(user.lastName);
      cy.get('#signupEmail').type(email);
      cy.get('#signupPassword').type(user.password, { sensitive: true });
      cy.get('#signupRepeatPassword').type(user.password, { sensitive: true });
      cy.get('.modal-content').contains('button', 'Register').click();
      cy.url().should('include', '/panel/garage');

      cy.get('#userNavDropdown').click();
      cy.contains('button', 'Logout').click();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);

      cy.login(email, user.password);
      cy.url().should('include', '/panel/garage');
      cy.get('h1').should('contain', 'Garage');
    });
  });
});
