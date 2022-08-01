import { faker } from '@faker-js/faker';

const randFirstName = faker.name.firstName();
const randLastName = faker.name.lastName();
let fullName = randFirstName.concat(" ", randLastName);

const randInteger = faker.random.numeric(5);

// Create Client Test Suite
describe('Create Client', () => {
// Executed first before the tests and asserting
  beforeEach(() => {
    cy.initPage()
    cy.login('mifos','password')
    cy.navigateToCreateClient()
    cy.fixture('clients').then(function(randData) {
        this.randData = randData
    })    
  })

  it('Creates Client With Valid Required Field', () => {
    cy.createClient(randFirstName, randLastName)
    cy.get('.client-title > strong.ng-binding').should('include.text', fullName)
    cy.url().should('include', '/viewclient')
  })

  describe('Negative Path of Create Client', () => {
    it.only('Creates Client With Integer in the Required Fields', () => {
      cy.createClient(randInteger, randInteger)
      cy.url().should('include', '/createclient')  
      cy.get(':nth-child(5) > div.ng-scope > .form-group > div.col-sm-2')
        .should('include.text', 'Name cannot start with')
        .and('include.text', 'Required Field')
        
    })
  })
})