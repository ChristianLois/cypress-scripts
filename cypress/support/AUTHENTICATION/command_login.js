import PAGE_LOGIN from '../../resources/PAGES/AUTHENTICATION/page_login.json';

Cypress.Commands.add('login', (username,password)=>{

    cy.get(PAGE_LOGIN.TEXTFIELD_USERNAME).type(username,{timeout:10000});
    
    cy.get(PAGE_LOGIN.TEXTFIELD_PASSWORD).type(password);

    cy.contains(PAGE_LOGIN.TEXT_SIGN_IN).click();
});
