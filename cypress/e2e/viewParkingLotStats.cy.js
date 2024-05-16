describe('Parking Lot Show Parking Spaces', () => {
    beforeEach(() => {
      cy.cleanDB()
      cy.populateWithDrivers()
      cy.createAdmin()
      cy.login('adminUsername', 'securePassword');
      cy.visit('http://localhost:9000/admin-dashboard');
    });
  
    afterEach(() => {
      cy.cleanDB()
    });
  
    it('should successfully open graphical representation of the parking lot', () => {
        // --------
        // ASSEMBLE
        // --------
        const testLotName = 'Test Lot 1'
        const testLotCapacity = 50
      
        // ---
        // ACT
        // ---
        cy.get('[data-test-id="create-park-lot-btn"]').click();
        cy.get('[data-test-id="lot-name-input"]').type(testLotName);
        cy.get('[data-test-id="lot-capacity-input"]').type(testLotCapacity);
        cy.get('[data-test-id="create-parking-lot-submit-button"]').click();
        cy.get('[data-test-id="create-close-btn"]').click();
        cy.wait(10000)
  
        // ------
        // ASSERT
        // ------
        cy.get('[data-test-id=parking-lot-0-show-details-btn]').click();
        cy.get('[data-test-id=parking-lot-modal').should('exist')
    });
  });
  