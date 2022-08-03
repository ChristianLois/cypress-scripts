// Author: Erru

import { clientDetails } from '../../common.cy'

describe('Create Client', { tags : '@client' } , function () { 
  // Setup
  beforeEach(function () {
    cy.fixture('create_client').then((createClient) => {
      this.createClient = createClient
    })
    cy.fixture('view_client').then((viewClient) => {
      this.viewClient = viewClient
    })
    cy.initPage()
    cy.login('mifos','password')
    cy.navigateToCreateClient()  
  })
  // Create Client Test Suite
  describe('Create Client', { tags : '@happy_path' } , function () {
    // Teardown
    afterEach(function () {
      cy.deleteClient(clientDetails.fullName)
    })

    it('Creates Client With Valid Required Field', function () {
      cy.createClient(clientDetails.firstName, clientDetails.lastName)
      cy.get(this.viewClient.TITLE_NAME).should('include.text', clientDetails.fullName)
      cy.url().should('include', '/viewclient')
    })

    it('Creates Client Optional Data', function () {
      cy.optionalDetails(clientDetails.firstName, clientDetails.middleName, clientDetails.lastName, 
                        clientDetails.mobileNo, clientDetails.birthDate)
      cy.get(this.viewClient.TITLE_NAME).should('include.text', clientDetails.fullName)
      cy.url().should('include', '/viewclient')
    })
  })

  describe('Negative Path of Create Client', { tags : '@negative' } , function () {
    it('Creates Client With Integer in the Required Fields', function () {
      cy.createClient(clientDetails.randInteger, clientDetails.randInteger)
      cy.url().should('include', '/createclient')
      cy.get(this.createClient.INVALID.FIRSTNAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.INVALID_MESSAGE)
        .and('include.text', this.createClient.EXPECTED.REQUIRED_FIELD)  
      cy.get(this.createClient.INVALID.LASTNAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.INVALID_MESSAGE)
        .and('include.text', this.createClient.EXPECTED.REQUIRED_FIELD)
    })

    it('Creates Client Blank Credentials', function () {
      cy.get(this.createClient.FORM.SUBMIT_BTN)
      cy.url().should('include', '/createclient')
      cy.get(this.createClient.INVALID.FIRSTNAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.REQUIRED_FIELD)
      cy.get(this.createClient.INVALID.LASTNAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.REQUIRED_FIELD)
    })

    it('Creates Client Maximum Characters', function () {
      cy.createClient(clientDetails.maxWords, clientDetails.maxWords)
      cy.url().should('include', '/createclient')
      cy.get(this.createClient.INVALID.FIRSTNAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.REQUIRED_FIELD)
      cy.get(this.createClient.INVALID.LASTNAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.REQUIRED_FIELD)
    })

    it('Creates Client Invalid Optional Data', function () {
      cy.optionalDetails(clientDetails.randInteger, clientDetails.randInteger, clientDetails.randInteger, 
                        clientDetails.firstName, clientDetails.firstName)
      cy.url().should('include', '/createclient')
      cy.get(this.createClient.INVALID.FIRSTNAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.INVALID_MESSAGE)
        .and('include.text', this.createClient.EXPECTED.REQUIRED_FIELD)  
      cy.get(this.createClient.INVALID.MIDDLENAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.INVALID_MESSAGE)
      cy.get(this.createClient.INVALID.LASTNAME_ERROR)
        .should('include.text', this.createClient.EXPECTED.INVALID_MESSAGE)
        .and('include.text', this.createClient.EXPECTED.REQUIRED_FIELD)
      cy.get(this.createClient.INVALID.MOBILENO_ERROR)
        .should('include.text', this.createClient.EXPECTED.NUMERIC_MESSAGE)
    })

    it('Creates Client Past Activation Date', function () {
      cy.get(this.createClient.FORM.FIRSTNAME_INPUT).type(clientDetails.firstName, {delay: 0})
      cy.get(this.createClient.FORM.LASTNAME_INPUT).type(clientDetails.lastName, {delay: 0})
      cy.get(this.createClient.FORM.ACTIVE_CHECKBOX).check()
      cy.get(this.createClient.FORM.ACTIVATION_DATE).clear()
        .type(clientDetails.pastActivationDate)
      cy.get(this.createClient.FORM.SUBMIT_BTN).click()
      cy.get(this.createClient.INVALID.ERRORS.PAST_ACTIVATION_DATE)
        .should('include.text', this.createClient.EXPECTED.ACTIVATION_DATE_MESSAGE)
    })
  })
})