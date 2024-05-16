describe('Ban User Form', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.populateWithDrivers()
        cy.createAdmin()
    });
  
    it('successfully bans a user', () => {
      // --------
      // ASSEMBLE
      // --------

      cy.login('adminUsername', 'securePassword');
      cy.visit('http://localhost:9000/manage-drivers')

      // ---
      // ACT
      // ---
      cy.get('[data-test-id="driver-0-ban-btn"]').click();
      // ------
      // ASSERT
      // ------

      cy.get('[data-test-id="driver-0-ban-user-success-alert"]').should('contain', 'Successfully banned user');
    });
  });
  
