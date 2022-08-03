// Author: Erru

import { clientDetails } from '../../common.cy'

// Create Client Test Suite
describe('Create Client', function () {
  // Setup
  beforeEach(function () {
    cy.fixture('clients').then((clients) => {
      this.clients = clients
    })
    cy.initPage()
    cy.login('mifos','password')
    cy.navigateToCreateClient()  
  })

  // Teardown
  afterEach(function () {
    cy.deleteClient(clientDetails.fullName)
  })

  it('Creates Client With Valid Required Field', function () {
    cy.createClient(clientDetails.firstName, clientDetails.lastName)
    cy.get('.client-title > strong.ng-binding').should('include.text', clientDetails.fullName)
    cy.url().should('include', '/viewclient')
  })

  it('Creates Client Optional Data', function () {
    cy.optionalDetails(clientDetails.firstName, clientDetails.middleName, clientDetails.lastName, 
                       clientDetails.mobileNo, clientDetails.birthDate)
    cy.get('.client-title > strong.ng-binding').should('include.text', clientDetails.fullName)
    cy.url().should('include', '/viewclient')
  })
})

describe('Negative Path of Create Client', function () {
  // Executed first before the tests and asserting
  beforeEach(function () {
    cy.fixture('clients').then((clients) => {
      this.clients = clients
    })
    cy.initPage()
    cy.login('mifos','password')
    cy.navigateToCreateClient()  
  })

  it('Creates Client With Integer in the Required Fields', function () {
    cy.createClient(clientDetails.randInteger, clientDetails.randInteger)
    cy.url().should('include', '/createclient')
    cy.get(':nth-child(3) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Name cannot start with')
      .and('include.text', 'Required Field')  
    cy.get(':nth-child(5) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Name cannot start with')
      .and('include.text', 'Required Field')
  })

  it('Creates Client Blank Credentials', function () {
    cy.createClient(" ", " ")
    cy.url().should('include', '/createclient')
    cy.get(':nth-child(3) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Required Field')
    cy.get(':nth-child(5) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Required Field')
  })

  it('Creates Client Maximum Characters', function () {
    cy.createClient(clientDetails.maxWords, clientDetails.maxWords)
    cy.url().should('include', '/createclient')
    cy.get(':nth-child(3) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Required Field')
    cy.get(':nth-child(5) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Required Field')
  })

  it('Creates Client Invalid Optional Data', function () {
    cy.optionalDetails(clientDetails.randInteger, clientDetails.randInteger, clientDetails.randInteger, 
                       clientDetails.firstName, clientDetails.firstName)
    cy.url().should('include', '/createclient')
    cy.get(':nth-child(3) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Name cannot start with')
      .and('include.text', 'Required Field')  
    cy.get(':nth-child(4) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Name cannot start with')
    cy.get(':nth-child(5) > div.ng-scope > .form-group > div.col-sm-2')
      .should('include.text', 'Name cannot start with')
      .and('include.text', 'Required Field')
    cy.get(':nth-child(7) > div.col-sm-2 > span > .required')
      .should('include.text', 'Must be numeric')
  })
})