Cypress.Commands.add('navigateToClients', ()=> {
    cy.get('[is-open="li.client.status.isopen"] > .dropdown-toggle').trigger('mouseover')
    cy.get('#swatch-menu').contains('Clients').click()
})

Cypress.Commands.add('deleteClient', (fullName)=>{
    cy.navigateToClients();
    cy.get('input[placeholder*="name/mobile"]').type(fullName);
    cy.get('span.fa-search').click();
    cy.wait(1000);
    cy.get('tbody > :nth-child(1) > :nth-child(1)').contains(fullName).click();
    cy.get('button').contains('Delete').click();
    cy.get('button').contains('Confirm').click();
})

Cypress.Commands.add('createClient', (firstName, lastName) => {
    cy.get('input#firstname').type(firstName, {delay: 0})
    cy.get('input#lastname').type(lastName, {delay: 0})
    cy.get('#submittedon').clear().type('03 August 2022')      //please remove this
    cy.get('#save').click()
})

Cypress.Commands.add('optionalDetails', (firstName, lastName, middleName, mobileNo, birthDate) => {
    cy.get('input#firstname').type(firstName, {delay: 0})
    cy.get('#middlename').type(middleName, {delay: 0})
    cy.get('input#lastname').type(lastName, {delay: 0})
    cy.get('#mobileNo').type(mobileNo, {delay: 0})
    cy.get('#dateofbirth').type(birthDate, {delay: 0})
    cy.get('#submittedon').clear().type('03 August 2022')      //please remove this
    cy.get('#save').click()
})

Cypress.Commands.add('navigateToCreateClient', () => {
    cy.get('[is-open="li.client.status.isopen"] > .dropdown-toggle').trigger('mouseover')
    cy.get('#swatch-menu').contains('Clients').click()
    cy.get('.col-sm-4 > [href="#/createclient"]').click()
})