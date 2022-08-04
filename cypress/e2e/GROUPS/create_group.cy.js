import INPUT_LOGIN from '../../data/INPUTS/AUTHENTICATION/input_login.json';
import SELECTORS_LIST_GROUPS from '../../resources/pages/groups/page_list_of_groups.json'
import EXPECTED_CREATE_GROUP from '../../data/expected/group/expected_create_group.json'
import SELECTORS_GROUP_PROFILE from '../../resources/pages/groups/page_group_profile.json'
import {faker} from '@faker-js/faker'

const [company_name, office, id, date] = [faker.company.companyName(), 'Head Office', String(faker.phone.number('0000#####')), String(faker.date.future())]

describe('Valid Create Group', function (){
    beforeEach(() => {
      cy.initPage();
      cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD);
      cy.go_to_list_of_groups();
    })


    it('Create Group Required Fields',{tags:['smoke_test','create_group_positive_test']},  function(){
        cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
        .click()
        cy.create_group(company_name, office)
        cy.url()
        .should('include',EXPECTED_CREATE_GROUP.VALID.URL)
        //Assertion
        cy.contains(SELECTORS_GROUP_PROFILE.TEXT_ACTIVATE)
        cy.contains(SELECTORS_GROUP_PROFILE.TEXT_EDIT)
        cy.contains(SELECTORS_GROUP_PROFILE.TEXT_MORE)
        //delete group 
        cy.go_to_list_of_groups()
        cy.search_group(company_name)
        cy.get(SELECTORS_LIST_GROUPS.FIRST_GROUP_IN_LIST)
        .should('have.text', company_name)
        .click()
        cy.delete_group()
    })
    //THIS TEST CASE SHOWS AN ERROR SINCE IT IS NOT POSSIBLE TO CLOSE THE GROUP AFTER ITS ACTIVATION
    /*
    it('Create Group with Activation Date',{tags:['smoke test','create group-positive test']},  function(){
      cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
      .click()
      cy.create_group_with_activation_date(company_name, office)
      cy.url()
      .should('include',EXPECTED_CREATE_GROUP.VALID.URL)
      //Assertion
      cy.contains('Activation Date')
      cy.contains('Edit')
      cy.contains('More')

      //delete group 
      cy.go_to_list_of_groups()
      cy.search_group(company_name)
      cy.get(SELECTORS_LIST_GROUPS.FIRST_GROUP_IN_LIST)
      .should('have.text', company_name)
      .click()
      cy.delete_group()
  })
  */
  it('Create Group with External Id',{tags:['smoke test','create group-positive test']},  function(){
    cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
    .click()
    cy.create_group_with_external_id(company_name, office, id)
    cy.url()
    .should('include',EXPECTED_CREATE_GROUP.VALID.URL)
    //Assertion
    cy.contains(SELECTORS_GROUP_PROFILE.TEXT_ACTIVATE)
    cy.contains(SELECTORS_GROUP_PROFILE.TEXT_EDIT)
    cy.contains(SELECTORS_GROUP_PROFILE.TEXT_MORE)
    cy.contains(id)
    //delete group 
    cy.go_to_list_of_groups()
    cy.search_group(company_name)
    cy.get(SELECTORS_LIST_GROUPS.FIRST_GROUP_IN_LIST)
    .should('have.text', company_name)
    .click()
    cy.delete_group()
})
  

    it('Create Group No Office Specified',{tags:['smoke test','create group-negative test']},  function(){

        cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
          .click()
        cy.create_group(company_name, '{enter}')
        //Assertion
        cy.contains(EXPECTED_CREATE_GROUP.INVALID.MESSAGE_OFFICE_MANDATORY)
    })
    
      it('Create Group No Group Name', {tags:['smoke test','create group-negative test']}, function(){
        cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
          .click()
    
        cy.create_group('{enter}', office)
        //Assertion
        cy.contains(EXPECTED_CREATE_GROUP.INVALID.MESSAGE_NAME_MANDATORY)
    })

    it('Create Group with Submitted Date Greater than Current Date', {tags:['smoke test','create group-negative test']}, function(){
      cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
        .click()
  
      cy.create_group_with_submitted_date(company_name, office, date)
      //Assertion
      cy.contains(EXPECTED_CREATE_GROUP.INVALID.MESSAGE_SUBMITTED_DATE)
      cy.url()
      .should('include',EXPECTED_CREATE_GROUP.INVALID.URL)
  })


})




