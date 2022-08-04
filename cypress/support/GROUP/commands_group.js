import SELECTORS_PAGE_PROFILE from '../../resources/pages/groups/page_group_profile.json'
import SELECTORS_LIST_GROUPS from '../../resources/pages/groups/page_list_of_groups.json'
import SELECTORS_HEADER from '../../RESOURCES/COMPONENTS/HEADER/component_header.json'

  Cypress.Commands.add('delete_group', () => {
    cy.get(SELECTORS_PAGE_PROFILE.DROPDOWN_MORE).click()
    cy.get(SELECTORS_PAGE_PROFILE.SUBMENU_DELETE).click()
    cy.get(SELECTORS_PAGE_PROFILE.MODAL_DELETE_GROUP.BTN_DELETE).click()
  })

  Cypress.Commands.add('search_group', (company_name) => {
    cy.get(SELECTORS_LIST_GROUPS.TEXTFIELD_MIDDLE_SEARCH_GROUP)
    .type(company_name,{delay: 0})

    cy.get(SELECTORS_LIST_GROUPS.BTN_SEARCH)
    .click()

  })

  Cypress.Commands.add('create_group', (company_name, office) => {
    cy.get(SELECTORS_LIST_GROUPS.MODAL_CREATE_GROUP.TEXTFIELD_NAME)
    .type(company_name,{delay: 0})

    cy.get(SELECTORS_LIST_GROUPS.MODAL_CREATE_GROUP.DROPDOWN_OFFICE)
    .click()
    
    cy.get(SELECTORS_LIST_GROUPS.MODAL_CREATE_GROUP.TEXTFIELD_OFFICE)
    .type(office)
    .type('{enter}',{delay: 0})

    cy.get(SELECTORS_LIST_GROUPS.MODAL_CREATE_GROUP.BTN_SAVE)
    .click()
  })

  Cypress.Commands.add('go_to_list_of_groups', () => {
    cy.contains(SELECTORS_HEADER.DROPDOWN_CLIENTS.TEXT_CLIENTS)
    .trigger('mouseover')
    .get(SELECTORS_HEADER.BUTTON_GROUPS)
    .click()
})

Cypress.Commands.add('create_group_with_external_id', (company_name, office, id) => {
  cy.get(SELECTORS_LIST_GROUPS.MODAL_CREATE_GROUP.TEXTFIELD_NAME)
  .type(company_name,{delay: 0})

  cy.get(SELECTORS_LIST_GROUPS.MODAL_CREATE_GROUP.DROPDOWN_OFFICE)
  .click()
  
  cy.get(SELECTORS_LIST_GROUPS.MODAL_CREATE_GROUP.TEXTFIELD_OFFICE)
  .type(office)
  .type('{enter}',{delay: 0})

  cy.get('#externalId')
  .type(id,{delay: 0} )

  cy.get(SELECTORS_LIST_GROUPS.MODAL_CREATE_GROUP.BTN_SAVE)
  .click()
})