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

//Author: Vince 
