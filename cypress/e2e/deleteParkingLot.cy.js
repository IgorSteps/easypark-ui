describe('Delete Parking Lot Form', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.populateWithDrivers()
        cy.createAdmin()
        cy.login('adminUsername', 'securePassword');
        cy.visit('http://localhost:9000/admin-dashboard');
    });
  
    it('successfully deletes a parking lot', () => {
      // --------
      // ASSEMBLE
      // --------
      cy.get('[data-test-id="create-park-lot-btn"]').click();
      cy.get('[data-test-id="lot-name-input"]').type('Test lot 1');
      cy.get('[data-test-id="lot-capacity-input"]').type("50");
      cy.get('[data-test-id="create-parking-lot-submit-button"]').click();
      cy.visit('http://localhost:9000/admin-dashboard');
      // ---
      // ACT
      // ---
      cy.get('[data-test-id="delete-park-lot-btn"]').click();
      cy.get('[data-test-id="select-delete-parking-lot"]').select('Test lot 1');
      cy.get('[data-test-id="delete-parking-lot-submit"]').click();
  
      // ------
      // ASSERT
      // ------

      cy.get('[data-test-id=delete-park-lot-success-alert]').should('contain', 'Successfully deleted parking lot');
    });
  });
  
