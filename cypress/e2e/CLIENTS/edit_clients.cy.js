// Author: Mark Anthony

import { edittedFirstName } from '../../common.cy'
import { edittedLastName } from '../../common.cy'

describe('Edit Client Test Case', () => {

    beforeEach(() => {
        cy.initPage();
        cy.login('mifos','password')
    })

    it('Edit Client with valid Data', {tags: ['regression', 'happy_path']}, () => {
      cy.fixture('example').then((data) => {
        //Create New Client
        cy.navigateToClients()
        cy.get('.col-sm-4 > [href="#/createclient"]').click()
        cy.createClient(data.firstName,data.lastName)
        //Edit Client
        cy.edit_client('valid',edittedFirstName,edittedLastName)
        //Assertion
        cy.get('.client-title > strong.ng-binding').contains(edittedFirstName + " " + edittedLastName) 
        //Re edit back to original       
        cy.edit_client('valid',data.firstName,data.lastName)
        //Assertion
        cy.get('.client-title > strong.ng-binding').contains(data.firstName + " " + data.lastName)
      })
      
      //Delete Client
      cy.get('[data-ng-click="deleteClient()"]').click()
      cy.get('.modal-body > .btn-primary').click()
    })

    it('Edit Client with blank names', {tags: ['regression', 'negative_path']}, () => {
      cy.fixture('example').then((data) => {
        //Create New Client
        cy.navigateToClients()
        cy.get('.col-sm-4 > [href="#/createclient"]').click()
        cy.createClient(data.firstName,data.lastName)
        //Edit Client
        cy.edit_client('blank','','')
        //Assertion
        cy.contains("Required Field")
        cy.url().should('include','/#/editclient')
      })
    })
})