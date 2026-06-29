describe('Home page – Header and Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  context('Header buttons', () => {
    it('should display the header logo link', () => {
      cy.get('.header_logo').should('be.visible');
    });

    it('should display "Home" navigation button', () => {
      cy.get('.header_nav a[routerlink="/"]').should('be.visible');
    });

    it('should display "About" navigation button', () => {
      cy.get('.header_nav button[appscrollto="aboutSection"]').should('be.visible');
    });

    it('should display "Contacts" navigation button', () => {
      cy.get('.header_nav button[appscrollto="contactsSection"]').should('be.visible');
    });

    it('should display "Guest log in" button', () => {
      cy.get('.header-link.-guest').should('be.visible');
    });

    it('should display "Sign In" button', () => {
      cy.get('.header_signin').should('be.visible');
    });
  });

  context('Footer (Contacts section) links', () => {
    beforeEach(() => {
      cy.get('#contactsSection').scrollIntoView({ duration: 800 });
      cy.wait(500);
    });

    it('should display Facebook social link', () => {
      cy.get('.contacts_socials .icon-facebook').should('be.visible');
    });

    it('should display Telegram social link', () => {
      cy.get('.contacts_socials .icon-telegram').should('be.visible');
    });

    it('should display YouTube social link', () => {
      cy.get('.contacts_socials .icon-youtube').should('be.visible');
    });

    it('should display Instagram social link', () => {
      cy.get('.contacts_socials .icon-instagram').should('be.visible');
    });

    it('should display LinkedIn social link', () => {
      cy.get('.contacts_socials .icon-linkedin').should('be.visible');
    });

    it('should display ithillel.ua link', () => {
      cy.get('.contacts_link[href="https://ithillel.ua"]').should('be.visible');
    });

    it('should display support email link', () => {
      cy.get('.contacts_link[href*="mailto"]').should('be.visible');
    });
  });
});
