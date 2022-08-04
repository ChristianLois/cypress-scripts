import PAGE_CREATE_CLIENT from "../../resources/PAGES/CLIENT/page_create_client.json";
import PAGE_VIEW_CLIENT from "../../resources/PAGES/CLIENT/page_view_client.json";
import PAGE_LIST_CLIENTS from "../../resources/PAGES/CLIENT/page_list_clients.json";
import COMPONENT_HEADER from "../../resources/COMPONENTS/HEADER/component_header.json";


Cypress.Commands.add('navigateToClients', ()=> {
    cy.get(COMPONENT_HEADER.DROPDOWN_MENU).trigger('mouseover')
    cy.get(COMPONENT_HEADER.SWATCH_MENU).contains(COMPONENT_HEADER.DROPDOWN_CLIENTS.TEXT_CLIENTS).click()
})

Cypress.Commands.add('deleteClient', (fullName)=>{
    cy.navigateToClients();
    cy.get(PAGE_LIST_CLIENTS.SEARCH_INPUT).type(fullName);
    cy.get(PAGE_LIST_CLIENTS.SEARCH_BTN).click();
    cy.wait(1000);
    cy.get(PAGE_LIST_CLIENTS.EXISTING_CLIENT).contains(fullName).click();
    cy.get(PAGE_VIEW_CLIENT.DELETE_MODAL.ELEMENT_BTN).contains(PAGE_VIEW_CLIENT.DELETE_MODAL.DELETE_LABEL).click();
    cy.get(PAGE_VIEW_CLIENT.DELETE_MODAL.ELEMENT_BTN).contains(PAGE_VIEW_CLIENT.DELETE_MODAL.CONFIRM_LABEL).click();
})

Cypress.Commands.add('createClient', (firstName, lastName) => {
    cy.get(PAGE_CREATE_CLIENT.FORM.FIRSTNAME_INPUT).type(firstName, {delay: 0})
    cy.get(PAGE_CREATE_CLIENT.FORM.LASTNAME_INPUT).type(lastName, {delay: 0})
    cy.get(PAGE_CREATE_CLIENT.FORM.SUBMIT_BTN).click()
})

Cypress.Commands.add('optionalDetails', (firstName, lastName, middleName, mobileNo, birthDate) => {
    cy.get(PAGE_CREATE_CLIENT.FORM.FIRSTNAME_INPUT).type(firstName, {delay: 0})
    cy.get(PAGE_CREATE_CLIENT.FORM.MIDDLENAME_INPUT).type(middleName, {delay: 0})
    cy.get(PAGE_CREATE_CLIENT.FORM.LASTNAME_INPUT).type(lastName, {delay: 0})
    cy.get(PAGE_CREATE_CLIENT.FORM.MOBILENO_INPUT).type(mobileNo, {delay: 0})
    cy.get(PAGE_CREATE_CLIENT.FORM.BIRTHDATE_INPUT).type(birthDate, {delay: 0})
    cy.get(PAGE_CREATE_CLIENT.FORM.SUBMIT_BTN).click()
})

Cypress.Commands.add('navigateToCreateClient', () => {
    cy.get(COMPONENT_HEADER.DROPDOWN_MENU).trigger('mouseover')
    cy.get(COMPONENT_HEADER.SWATCH_MENU).contains(COMPONENT_HEADER.DROPDOWN_CLIENTS.TEXT_CLIENTS).click()
    cy.get(PAGE_LIST_CLIENTS.CREATE_CLIENT_BTN).click()
})