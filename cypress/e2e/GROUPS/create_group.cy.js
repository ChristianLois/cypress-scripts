import INPUT_LOGIN from '../../data/INPUTS/AUTHENTICATION/input_login.json';
import INPUTS_CREATE_GROUP from '../../data/INPUTS/GROUP/input_create_group.json'
import SELECTORS_LIST_GROUPS from '../../resources/pages/groups/page_list_of_groups.json'
import EXPECTED_CREATE_GROUP from '../../data/expected/group/expected_create_group.json'
import SELECTORS_GROUP_PROFILE from '../../resources/pages/groups/page_group_profile.json'
import { generateClientDetails } from '../../common.cy'
import { inputs_date } from '../../data/INPUTS/CLIENT/input_date_create_client.js'

describe('Create Group', function (){

    var groupDetails; 

    beforeEach(() => {
      cy.initPage();
      cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD);
      cy.go_to_list_of_groups();
    })

    afterEach(() => {
      cy.go_to_list_of_groups()
      cy.search_group(groupDetails.groupName)
      cy.get(SELECTORS_LIST_GROUPS.FIRST_GROUP_IN_LIST)
      .should('have.text', groupDetails.groupName)
      .click()
      cy.delete_group()
    })

    it('Create Group Required Fields',{tags:['smoke_test', 'positive_test']},  function(){
        groupDetails = generateClientDetails()
        cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
        .click()
        cy.create_group(groupDetails.groupName,INPUTS_CREATE_GROUP.DEFAULT_OFFICE)
        cy.url()
        .should('include',EXPECTED_CREATE_GROUP.VALID.URL)
        //Assertion
        cy.contains(SELECTORS_GROUP_PROFILE.TEXT_ACTIVATE)
        cy.contains(SELECTORS_GROUP_PROFILE.TEXT_EDIT)
        cy.contains(SELECTORS_GROUP_PROFILE.TEXT_MORE)       
    })
  
  it('Create Group with External Id',{tags:['smoke_test','create_group_positive_test']},  function(){
    groupDetails = generateClientDetails()
    cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
    .click()
    cy.create_group_with_external_id(groupDetails.groupName, INPUTS_CREATE_GROUP.DEFAULT_OFFICE,groupDetails.externalId)
    cy.url()
    .should('include',EXPECTED_CREATE_GROUP.VALID.URL)
    //Assertion
    cy.contains(SELECTORS_GROUP_PROFILE.TEXT_ACTIVATE)
    cy.contains(SELECTORS_GROUP_PROFILE.TEXT_EDIT)
    cy.contains(SELECTORS_GROUP_PROFILE.TEXT_MORE)
    cy.contains(groupDetails.externalId)
  })

})

describe('Invalid Create Group',function(){

  beforeEach(() => {
    cy.initPage();
    cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD);
    cy.go_to_list_of_groups();
  })

 
  it('Create Group No Office Specified',{tags:['smoke_test','create_group_negative_test']},  function(){
    let groupDetails = generateClientDetails();
    cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
      .click()
    cy.create_group(groupDetails.groupName, '{enter}')
    //Assertion
    cy.contains(EXPECTED_CREATE_GROUP.INVALID.MESSAGE_OFFICE_MANDATORY)
})

  it('Create Group No Group Name', {tags:['smoke_test','create_group_negative_test']}, function(){
    let groupDetails = generateClientDetails();
    cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
      .click()
    cy.create_group('{enter}', INPUTS_CREATE_GROUP.DEFAULT_OFFICE)
    //Assertion
    cy.contains(EXPECTED_CREATE_GROUP.INVALID.MESSAGE_NAME_MANDATORY)
})

it('Create Group with Submitted Date Greater than Current Date', {tags:['smoke_test','create_group_negative_test']}, function(){
  let groupDetails = generateClientDetails();
  cy.get(SELECTORS_LIST_GROUPS.BTN_CREATE_GROUP)
    .click()
  cy.create_group_with_submitted_date(groupDetails.groupName, INPUTS_CREATE_GROUP.DEFAULT_OFFICE, inputs_date[2].input_date)
  //Assertion
  cy.contains(EXPECTED_CREATE_GROUP.INVALID.MESSAGE_SUBMITTED_DATE)
  cy.url()
  .should('include',EXPECTED_CREATE_GROUP.INVALID.URL)
})
})




