describe('Create Parking Lot Form', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.populateWithDrivers()
        cy.createAdmin()
        cy.login('adminUsername', 'securePassword');
        cy.visit('http://localhost:9000/admin-dashboard');
    });
  
    it('successfully creates a parking lot', () => {
      // --------
      // ASSEMBLE
      // --------
  
      // ---
      // ACT
      // ---
      cy.get('[data-test-id="create-park-lot-btn"]').click();
      cy.get('[data-test-id="lot-name-input"]').type('Test lot 1');
      cy.get('[data-test-id="lot-capacity-input"]').type("50");
      cy.get('[data-test-id="create-parking-lot-submit-button"]').click();
  
      // ------
      // ASSERT
      // ------

      cy.get('[data-test-id=create-park-lot-success-alert]').should('contain', 'Successfully created parking lot');
    });
  
    it('fails to create a parking lot', () => {
      // --------
      // ASSEMBLE
      // --------
  
      // ---
      // ACT
      // ---
      cy.get('[data-test-id="create-park-lot-btn"]').click();
      cy.get('[data-test-id="lot-name-input"]').type('Test lot 1');
      cy.get('[data-test-id="lot-capacity-input"]').type("50");
      cy.get('[data-test-id="create-parking-lot-submit-button"]').click();

      cy.visit('http://localhost:9000/admin-dashboard');

      cy.get('[data-test-id="create-park-lot-btn"]').click();
      cy.get('[data-test-id="lot-name-input"]').type('Test lot 1');
      cy.get('[data-test-id="lot-capacity-input"]').type("60");
      cy.get('[data-test-id="create-parking-lot-submit-button"]').click();
  
      // ------
      // ASSERT
      // ------
      cy.get('[data-test-id="create-park-lot-alert"]').should('contain', "Resource 'Test lot 1' already exists")
    });
  });
  