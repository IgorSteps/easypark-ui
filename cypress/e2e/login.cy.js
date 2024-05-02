describe('Login Form', () => {
  beforeEach(() => {
  });

  it('successfully logs in', () => {
    // --------
    // ASSEMBLE
    // --------
    cy.visit('http://localhost:9000/login');

    // ---
    // ACT
    // ---
    cy.get('[data-test-id="login-username-input"]').type('user1');
    cy.get('[data-test-id="login-password-input"]').type('password1');
    cy.get('[data-test-id="login-submit-button"]').click();

    // ------
    // ASSERT
    // ------
    cy.url().should('include', '/home'); 
  });
});
