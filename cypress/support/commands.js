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

Cypress.Commands.add('client_dropdown', (selection) => {
    cy.get('a').contains('Clients').trigger('mouseover');
    cy.get('#swatch-menu > li:nth-child('+selection+') > a').click()
})


Cypress.Commands.add('create_valid_client', (firstName, lastName) => {
    cy.client_dropdown('1')
    cy.get('.col-sm-4 > [href="#/createclient"]').click()
    cy.get('#firstname').type(firstName)
    cy.get('#lastname').type(lastName)
    cy.get('#save').click()
    cy.get('.client-title > strong.ng-binding').contains(firstName + " " + lastName)
})


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