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
      cy.visit('http://localhost:9000/register')
      cy.get('[data-test-id="register-firstname-input"]').type('test1');
      cy.get('[data-test-id="register-lastname-input"]').type('test1');
      cy.get('[data-test-id="register-username-input"]').type('test1');
      cy.get('[data-test-id="register-password-input"]').type('securepassword');
      cy.get('[data-test-id="register-email-input"]').type('testEmail');
      cy.get('[data-test-id="register-submit-button"]').click();

      cy.visit('http://localhost:9000/admin-login');
      cy.get('[data-test-id="login-username-input"]').type('adminUsername');
      cy.get('[data-test-id="login-password-input"]').type('securePassword');
      cy.get('[data-test-id="login-submit-button"]').click();

      cy.get('[data-test-id="ban-user-btn"]').click();

      // ---
      // ACT
      // ---
      cy.get('[data-test-id="select-ban-user"]').select('test1');
      cy.get('[data-test-id="select-ban-user-submit"]').click();
      // ------
      // ASSERT
      // ------

      cy.get('[data-test-id=ban-driver-success-alert]').should('contain', 'Successfully banned user');
    });
  });
  