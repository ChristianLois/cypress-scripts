// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }

//import { faker } from '@faker-js/faker';

Cypress.Commands.add('initPage', ()=>{
    cy.visit('/');
});

Cypress.Commands.add('login', (username,password)=>{
    cy.get('#uid')
    .type(username,{timeout:10000});
    
    cy.get('#pwd')
    .type(password);

    cy.contains('Sign In').click();
});

Cypress.Commands.add('navigateToClients', ()=> {
    cy.get('a').contains('Clients').trigger('mouseover');
    cy.get('[href="#/clients"]').click();
})

Cypress.Commands.add('deleteClient', (fullName)=>{
    cy.navigateToClients();
    cy.get('input[placeholder*="name/mobile"]').type(fullName);
    cy.get('span.fa-search').click();
    cy.wait(1000);
    cy.get('td[data-ng-click="routeTo(client.id)"]').contains(fullName).click();
    cy.get('button').contains('Delete').click();
    cy.get('button').contains('Confirm').click();
})

Cypress.Commands.add('createClient', (firstName, lastName) => {
    cy.get('input#firstname').type(firstName, {delay: 0})
    cy.get('input#lastname').type(lastName, {delay: 0})
    cy.get('#save').click()
})

// Author: Erru
Cypress.Commands.add('optionalDetails', (firstName, lastName, middleName, mobileNo, birthDate) => {
    cy.get('input#firstname').type(firstName, {delay: 0})
    cy.get('#middlename').type(middleName, {delay: 0})
    cy.get('input#lastname').type(lastName, {delay: 0})
    cy.get('#mobileNo').type(mobileNo, {delay: 0})
    cy.get('#dateofbirth').type(birthDate, {delay: 0})
    cy.get('#save').click()
})

// Author: Erru
Cypress.Commands.add('navigateToCreateClient', () => {
    cy.get('[is-open="li.client.status.isopen"] > .dropdown-toggle').trigger('mouseover')
    cy.get('#swatch-menu').contains('Clients').click()
    cy.get('.col-sm-4 > [href="#/createclient"]').click()
})

// Author: Mark Anthony
Cypress.Commands.add('edit_client', (type, firstName, lastName) => {
    if (type == 'valid'){
        cy.get('[href^="#/editclient"]').click()
        cy.get('#firstname').clear().type(firstName)
        cy.get('#lastname').clear().type(lastName)
        cy.get('#save').click()
    }

    else if (type == 'blank'){
        cy.get('[href^="#/editclient"]').click()
        cy.get('#firstname').clear()
        cy.get('#lastname').clear()
        cy.get('#save').click()
    }
})