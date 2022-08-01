describe('Logout', ()=>{
    beforeEach(()=>{
        cy.initPage();
        cy.login('mifos', 'password');
      })

    it('Logs out the user', ()=>{
        cy.get('#user-dropdown').trigger('mouseover');
        cy.get('#logout').click();
        cy.get('#uid').should('be.visible');
    });
})