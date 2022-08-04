// Author: Erru

import { clientDetails } from '../../common.cy'
import INPUT_LOGIN from '../../data/INPUTS/AUTHENTICATION/input_login.json'
import CREATE_CLIENT from "../../resources/PAGES/CLIENT/page_create_client.json";
import VIEW_CLIENT from "../../resources/PAGES/CLIENT/page_view_client.json";
import EXPECTED_CREATE_CLIENT from "../../data/EXPECTED/CLIENT/expected_create_client.json"


describe('Create Client', { tags : '@client' } , function () { 
  // Setup
  beforeEach(function () {
    cy.initPage()
    cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD)
    cy.navigateToCreateClient()  
  })
  // Create Client Test Suite
  describe('Create Client', {tags: ['smoke_test', 'positive_test']} , function () {
    // Teardown
    afterEach(function () {
      cy.deleteClient(clientDetails.fullName)
    })

    it('Creates Client With Valid Required Field', function () {
      cy.createClient(clientDetails.firstName, clientDetails.lastName)
      cy.get(VIEW_CLIENT.TITLE_NAME).should('include.text', clientDetails.fullName)
      cy.url().should('include', EXPECTED_CREATE_CLIENT.URLS.VIEW_CLIENT)
    })

    it('Creates Client Optional Data', function () {
      cy.optionalDetails(clientDetails.firstName, clientDetails.middleName, clientDetails.lastName, 
                        clientDetails.mobileNo, clientDetails.birthDate)
      cy.get(VIEW_CLIENT.TITLE_NAME).should('include.text', clientDetails.fullName)
      cy.url().should('include', EXPECTED_CREATE_CLIENT.URLS.VIEW_CLIENT)
    })
  })

  describe('Negative Path of Create Client', {tags: ['smoke_test','create_client_negative_test']} , function () {
    it('Creates Client With Integer in the Required Fields', function () {
      cy.createClient(clientDetails.randInteger, clientDetails.randInteger)
      cy.url().should('include', EXPECTED_CREATE_CLIENT.URLS.CREATE_CLIENT)
      cy.get(CREATE_CLIENT.INVALID.FIRSTNAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.INVALID_MESSAGE)
        .and('include.text', EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)  
      cy.get(CREATE_CLIENT.INVALID.LASTNAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.INVALID_MESSAGE)
        .and('include.text', EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)
    })

    it('Creates Client Blank Credentials', function () {
      cy.get(CREATE_CLIENT.FORM.SUBMIT_BTN)
      cy.url().should('include', EXPECTED_CREATE_CLIENT.URLS.CREATE_CLIENT)
      cy.get(CREATE_CLIENT.INVALID.FIRSTNAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)
      cy.get(CREATE_CLIENT.INVALID.LASTNAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)
    })

    it('Creates Client Maximum Characters', function () {
      cy.createClient(clientDetails.maxWords, clientDetails.maxWords)
      cy.url().should('include', EXPECTED_CREATE_CLIENT.URLS.CREATE_CLIENT)
      cy.get(CREATE_CLIENT.INVALID.FIRSTNAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)
      cy.get(CREATE_CLIENT.INVALID.LASTNAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)
    })

    it('Creates Client Invalid Optional Data', function () {
      cy.optionalDetails(clientDetails.randInteger, clientDetails.randInteger, clientDetails.randInteger, 
                        clientDetails.firstName, clientDetails.firstName)
      cy.url().should('include', EXPECTED_CREATE_CLIENT.URLS.CREATE_CLIENT)
      cy.get(CREATE_CLIENT.INVALID.FIRSTNAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.INVALID_MESSAGE)
        .and('include.text', EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)  
      cy.get(CREATE_CLIENT.INVALID.MIDDLENAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.INVALID_MESSAGE)
      cy.get(CREATE_CLIENT.INVALID.LASTNAME_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.INVALID_MESSAGE)
        .and('include.text', EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)
      cy.get(CREATE_CLIENT.INVALID.MOBILENO_ERROR)
        .should('include.text', EXPECTED_CREATE_CLIENT.NUMERIC_MESSAGE)
    })

    it('Creates Client Past Activation Date', function () {
      cy.get(CREATE_CLIENT.FORM.FIRSTNAME_INPUT).type(clientDetails.firstName, {delay: 0})
      cy.get(CREATE_CLIENT.FORM.LASTNAME_INPUT).type(clientDetails.lastName, {delay: 0})
      cy.get(CREATE_CLIENT.FORM.ACTIVE_CHECKBOX).check()
      cy.get(CREATE_CLIENT.FORM.ACTIVATION_DATE).clear()
        .type(clientDetails.pastActivationDate)
      cy.get(CREATE_CLIENT.FORM.SUBMIT_BTN).click()
      cy.get(CREATE_CLIENT.INVALID.ERRORS.PAST_ACTIVATION_DATE)
        .should('include.text', EXPECTED_CREATE_CLIENT.ACTIVATION_DATE_MESSAGE)
    })
  })
})

//series of data - static version
describe('Create Client Series of Data Birthday', () => {

  const fixtures = [
    {date: new Date("10 June 2000"),testname:"Create Client Birthday Before Current Date", input_date: "10 June 2000"},
    {date: new Date("04 August 2022"),testname:"Create Client Birthday On Current Date", input_date: "04 August 2022"},
    {date: new Date("25 December 2022"),testname:"Create Client Birthday After Current Date", input_date: "25 December 2022"}
  ]
  
  const currentDate = new Date();

  fixtures.forEach(fixture => {
    describe("Creating a Client with Birthday From " + fixture.input_date, () => {
      before(function () {
        cy.initPage()
        cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD)
        cy.navigateToCreateClient()  
      })
      it(fixture.testname, function(){
        cy.optionalDetails(clientDetails.firstName, clientDetails.middleName, clientDetails.lastName, 
          clientDetails.mobileNo, fixture.input_date)

        if(fixture.date <= currentDate){
          cy.get(VIEW_CLIENT.TITLE_NAME).should('include.text', clientDetails.fullName)
          cy.url().should('include', EXPECTED_CREATE_CLIENT.URLS.VIEW_CLIENT)
          cy.deleteClient(clientDetails.fullName)
        }else{
          cy.contains("validation.msg.client.dateOfBirth.is.greater.than.date - ")
        }
      })

    })
  })
})