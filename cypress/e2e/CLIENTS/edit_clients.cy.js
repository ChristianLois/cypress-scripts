// Author: Mark Anthony

import { clientDetails } from '../../common.cy'
import INPUT_LOGIN from '../../data/INPUTS/AUTHENTICATION/input_login.json'
import VIEW_CLIENT from "../../resources/PAGES/CLIENT/page_view_client.json";
import EXPECTED_CREATE_CLIENT from "../../data/EXPECTED/CLIENT/expected_create_client.json"

describe('Edit Client', () => {

    beforeEach(() => {
      cy.initPage()
      cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD)
    })

    afterEach(() => {
      cy.deleteClient(clientDetails.fullName)
    })

    it('Edit Client with valid Data', {tags: ['smoke_test','edit_client_positive_test']}, () => {
      //Create New Client
      cy.navigateToCreateClient()
      cy.createClient(clientDetails.firstName,clientDetails.lastName)
      //Edit Client
      cy.edit_client(clientDetails.edittedFirstName,clientDetails.edittedLastName)
      //Assertion
      cy.get(VIEW_CLIENT.TITLE_NAME).contains(clientDetails.edittedFirstName + " " + clientDetails.edittedLastName) 
      //Re edit back to original       
      cy.edit_client(clientDetails.firstName,clientDetails.lastName)
      //Assertion
      cy.get(VIEW_CLIENT.TITLE_NAME).contains(clientDetails.firstName + " " + clientDetails.lastName)
      cy.url().should('include', EXPECTED_CREATE_CLIENT.URLS.VIEW_CLIENT)
      
      
    })

    it('Edit Client with blank names', {tags: ['smoke_test','edit_client_negative_test']}, () => {
      //Create New Client
      cy.navigateToCreateClient()
      cy.createClient(clientDetails.firstName,clientDetails.lastName)
      //Edit Client
      cy.edit_client('blank',' ',' ')
      //Assertion
      cy.contains(EXPECTED_CREATE_CLIENT.REQUIRED_FIELD)
      cy.url().should('include',EXPECTED_CREATE_CLIENT.URLS.EDIT_CLIENT)
    })
})