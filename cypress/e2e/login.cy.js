describe('Login Form', () => {
  beforeEach(() => {
    cy.populateWithDrivers()
    cy.visit('http://localhost:9000/driver-dashboard');
  });

  afterEach(() => {
    cy.cleanDB()
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
    cy.get('[data-test-id="login-password-input"]').type('securepassword');
    cy.get('[data-test-id="login-submit-button"]').click();

    // ------
    // ASSERT
    // ------
    cy.url().should('include', '/driver-dashboard'); 
  });

  it('fails the log in and shows the error', () => {
    // --------
    // ASSEMBLE
    // --------
    cy.visit('http://localhost:9000/login');

    // ---
    // ACT
    // ---
    cy.get('[data-test-id="login-username-input"]').type('wrong');
    cy.get('[data-test-id="login-password-input"]').type('wrong');
    cy.get('[data-test-id="login-submit-button"]').click();

    // ------
    // ASSERT
    // ------
    cy.get('[data-test-id="login-alert"]').should('contain', "Resource 'wrong' not found")
  });
});
