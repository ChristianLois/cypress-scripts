import INPUT_LOGIN from '../../data/INPUTS/AUTHENTICATION/input_login.json';
import COMPONENT_HEADER from '../../resources/COMPONENTS/HEADER/component_header.json';
import PAGE_LOGIN from '../../resources/PAGES/AUTHENTICATION/page_login.json';

describe('Logout', ()=>{
    beforeEach(()=>{
        cy.initPage();
        cy.login(INPUT_LOGIN.VALID.USERNAME, INPUT_LOGIN.VALID.PASSWORD);
      })

    it('Logs out the user', ()=>{
        cy.get(COMPONENT_HEADER.DROPDOWN_MIFOS).trigger('mouseover');
        cy.get(COMPONENT_HEADER.BUTTON_LOGOUT).click();
        cy.get(PAGE_LOGIN.TEXTFIELD_USERNAME).should('be.visible');
    });
})