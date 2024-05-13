describe('Ban User Form', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.createAdmin()
    });
  
    it('successfully bans a user', () => {
      // --------
      // ASSEMBLE
      // --------
      cy.visit('http://localhost:9000/register')
      cy.get('[data-test-id="register-firstname-input"]').type('test1');
      cy.get('[data-test-id="register-lastname-input"]').type('test1');
      cy.get('[data-test-id="register-username-input"]').type('test1');
      cy.get('[data-test-id="register-password-input"]').type('securepassword');
      cy.get('[data-test-id="register-email-input"]').type('testEmail');
      cy.get('[data-test-id="register-submit-button"]').click();

      cy.login('adminUsername', 'securePassword');
      cy.visit('http://localhost:9000/manage-drivers')

      // ---
      // ACT
      // ---
      cy.get('[data-test-id="driver-0-ban-btn"]').click();
      cy.wait(10000);
      // ------
      // ASSERT
      // ------

      cy.get('[data-test-id="driver-0-status"]').should('contain', 'banned');
    });
  });
  