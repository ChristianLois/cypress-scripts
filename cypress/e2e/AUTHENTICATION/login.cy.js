import PAGE_HOME from '../../resources/PAGES/HOME/page_home.json';
import PAGE_LOGIN from '../../resources/PAGES/AUTHENTICATION/page_login.json';
import EXPECTED_LOGIN from '../../data/EXPECTED/AUTHENTICATION/expected_login.json';
import INPUT_LOGIN from '../../data/INPUTS/AUTHENTICATION/input_login.json';

describe('Login', () => {
  beforeEach(()=>{
    cy.initPage();
  });
  it('Logs in with valid credentials', {tags: ['smoke_test','login_positive_test']}, () => {

    cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD);

    cy.url().should('include', EXPECTED_LOGIN.VALID.PATH_URL);
    cy.get(PAGE_HOME.TEXT_WELCOME).should('contain.text', EXPECTED_LOGIN.VALID.TEXT_WELCOME);
  });

  it('Logs in with blank username', {tags: ['smoke_test','login_negative_test']}, () => {

    cy.login(' ',INPUT_LOGIN.VALID.PASSWORD);

    cy.url().should('not.include', EXPECTED_LOGIN.VALID.PATH_URL);
    cy.get(PAGE_LOGIN.TEXT_INVALID_LOGIN).should('be.visible');
  });

  it('Logs in with invalid username', {tags: ['smoke_test','login_negative_test']}, () => {

    cy.login(INPUT_LOGIN.INVALID.USERNAME,INPUT_LOGIN.VALID.PASSWORD);

    cy.url().should('not.include', EXPECTED_LOGIN.VALID.PATH_URL);
    cy.get(PAGE_LOGIN.TEXT_INVALID_LOGIN).should('be.visible');
  });

  it('Logs in with blank password', {tags: ['smoke_test','login_negative_test']}, () => {

    cy.login(INPUT_LOGIN.VALID.USERNAME,' ');

    cy.url().should('not.include', EXPECTED_LOGIN.VALID.PATH_URL);
    cy.get(PAGE_LOGIN.TEXT_INVALID_LOGIN).should('be.visible');
  });

  it('Logs in with invalid password', {tags: ['smoke_test','login_negative_test']}, () => {

    cy.login(INPUT_LOGIN.VALID.USERNAME,INPUT_LOGIN.INVALID.PASSWORD);

    cy.url().should('not.include', EXPECTED_LOGIN.VALID.PATH_URL);
    cy.get(PAGE_LOGIN.TEXT_INVALID_LOGIN).should('be.visible');
  });

})