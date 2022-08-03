import INPUT_LOGIN from '../../data/INPUTS/AUTHENTICATION/input_login.json';
import SELECTORS_LIST_GROUPS from '../../resources/pages/groups/page_list_of_groups.json'
import EXPECTED_CREATE_GROUP from '../../data/expected/group/expected_create_group.json'
import {faker} from '@faker-js/faker'

const [company_name, office] = [faker.company.companyName(), 'Head Office']

describe('Valid Create Group', function (){
    beforeEach(() => {
      cy.initPage();
      cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD);
      cy.go_to_list_of_groups();
    })


    it('Create Group',{tags:['regression', 'happy_path']},  function(){
        cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
        .click()

        cy.create_group(company_name, office)

        cy.url()
        .should('include',EXPECTED_CREATE_GROUP.VALID.URL)
        
          //Assertion
        cy.contains('Activate')
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

    it('Create Group No Office Specified',{tags:['regression', 'negative']},  function(){

        cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
          .click()
        cy.create_group(company_name, '{enter}')
        //Assertion
        cy.contains(EXPECTED_CREATE_GROUP.INVALID.MESSAGE_OFFICE_MANDATORY)
    })
    
      it('Create Group No Group Name', {tags:['regression', 'negative']}, function(){
        cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
          .click()
    
        cy.create_group('{enter}', office)
        //Assertion
        cy.contains(EXPECTED_CREATE_GROUP.INVALID.MESSAGE_NAME_MANDATORY)
    })
})




