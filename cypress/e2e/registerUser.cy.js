describe('Register Form', () => {
    beforeEach(() => {
      cy.populateWithDrivers()
      cy.visit('http://localhost:9000/register');
    });
  
    afterEach(() => {
      cy.cleanDB()
    });
  
    it('successfully registers user', () => {
      // ---
      // ACT
      // ---
      cy.get('[data-test-id="register-firstname-input"]').type('test1');
      cy.get('[data-test-id="register-lastname-input"]').type('test1');
      cy.get('[data-test-id="register-username-input"]').type('test1');
      cy.get('[data-test-id="register-password-input"]').type('securepassword');
      cy.get('[data-test-id="register-email-input"]').type('testEmail');
      cy.get('[data-test-id="register-submit-button"]').click();
  
      // ------
      // ASSERT
      // ------
      cy.url().should('include', '/login'); 
    });
  
    it('fails to register a user and shows the error', () => {
      // --------
      // ASSEMBLE
      // --------
      cy.get('[data-test-id="register-firstname-input"]').type('test1');
      cy.get('[data-test-id="register-lastname-input"]').type('test1');
      cy.get('[data-test-id="register-username-input"]').type('test1');
      cy.get('[data-test-id="register-password-input"]').type('securepassword');
      cy.get('[data-test-id="register-email-input"]').type('test1Email');
      cy.get('[data-test-id="register-submit-button"]').click();
      cy.visit('http://localhost:9000/register');
      // ---
      // ACT
      // ---
      cy.get('[data-test-id="register-firstname-input"]').type('test2');
      cy.get('[data-test-id="register-lastname-input"]').type('test2');
      cy.get('[data-test-id="register-username-input"]').type('test1');
      cy.get('[data-test-id="register-password-input"]').type('securepassword');
      cy.get('[data-test-id="register-email-input"]').type('test2Email');
      cy.get('[data-test-id="register-submit-button"]').click();
  
      // ------
      // ASSERT
      // ------
      cy.get('[data-test-id="register-alert"]').should('contain', "Resource 'test1' already exists")
    });
  });
  