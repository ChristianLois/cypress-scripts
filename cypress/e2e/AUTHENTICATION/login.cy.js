describe('Login', () => {
  beforeEach(()=>{
    cy.initPage();
  })
  it('Logs in with valid credentials', () => {

    cy.login('mifos','password');

    cy.url().should('include', '/home');
    cy.get('h3 strong').should('contain.text', 'Welcome, mifos');
  });

  it('Logs in with blank username', () => {

    cy.login(' ','password');

    cy.url().should('not.include', '/home');
    cy.get('div[ng-show*="Failed"]').should('be.visible');
  });

  it('Logs in with invalid username', () => {

    cy.login('mifoss','password');

    cy.url().should('not.include', '/home');
    cy.get('div[ng-show*="Failed"]').should('be.visible');
  });

  it('Logs in with blank password', () => {

    cy.login('mifos',' ');

    cy.url().should('not.include', '/home');
    cy.get('div[ng-show*="Failed"]').should('be.visible');
  });

  it('Logs in with invalid password', () => {

    cy.login('mifos','wrongPass');

    cy.url().should('not.include', '/home');
    cy.get('div[ng-show*="Failed"]').should('be.visible');
  });

})