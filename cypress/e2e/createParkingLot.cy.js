describe('Create Parking Lot Form', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.populateWithDrivers()
        cy.createAdmin()
        cy.login('adminUsername', 'securePassword');
        cy.visit('http://localhost:9000/create-parking-lot');
    });
  
    it('successfully creates a parking lot', () => {
      // --------
      // ASSEMBLE
      // --------
  
      // ---
      // ACT
      // ---
      cy.get('[data-test-id="lot-name-input"]').type('Test lot 1');
      cy.get('[data-test-id="lot-capacity-input"]').type("50");
      cy.get('[data-test-id="create-parking-lot-submit-button"]').click();
  
      // ------
      // ASSERT
      // ------

      cy.url().should('include', '/admin-dashboard'); 
    });
  
    it('fails to create a parking lot', () => {
      // --------
      // ASSEMBLE
      // --------
      cy.visit('http://localhost:9000/create-parking-lot');
  
      // ---
      // ACT
      // ---
      cy.get('[data-test-id="lot-name-input"]').type('Test lot 1');
      cy.get('[data-test-id="lot-capacity-input"]').type("50");
      cy.get('[data-test-id="create-parking-lot-submit-button"]').click();

      cy.visit('http://localhost:9000/create-parking-lot');

      cy.get('[data-test-id="lot-name-input"]').type('Test lot 1');
      cy.get('[data-test-id="lot-capacity-input"]').type("60");
      cy.get('[data-test-id="create-parking-lot-submit-button"]').click();
  
      // ------
      // ASSERT
      // ------
      cy.get('[data-test-id="create-parking-lot-alert"]').should('contain', "Resource 'Test lot 1' already exists")
    });
  });
  