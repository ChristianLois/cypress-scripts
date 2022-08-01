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
    cy.get('input#firstname').type(firstName);
    cy.get('input#lastname').type(lastName);
    cy.get('#save').click();
})

Cypress.Commands.add('generateRandomClientData', () => {
    const details = {
        firstName : faker.name.firstName(),
        middleName : faker.name.lastName(),
        lastName : faker.name.lastName(),
        birthdate : String(faker.date.birthdate()),
        mobileNo : faker.phone.number('09#########'),
    }

    cy.wrap(details).as('details');
})

// Author: Erru
Cypress.Commands.add('navigateToCreateClient', () => {
    cy.get('[is-open="li.client.status.isopen"] > .dropdown-toggle').trigger('mouseover')
    cy.get('#swatch-menu').contains('Clients').click()
    cy.get('.col-sm-4 > [href="#/createclient"]').click()
})