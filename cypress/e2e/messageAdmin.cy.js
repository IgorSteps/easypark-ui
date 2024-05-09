describe('Message Admin Form', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.populateWithDrivers()
        cy.createAdmin()
        cy.login('user1', 'securepassword')
        cy.visit('http://localhost:9000/driver-dashboard');
    });

    afterEach(() => {
       cy.cleanDB()
    });

    it('successfully messages admin', () => {
        // ---------
        // ASSEMBLE
        // ---------
        const messagesToSend = [
            "hi",
            "how are you",
            "i need help"
        ]
        cy.get(`[data-test-id="message-admin-link"]`).click()
       

        // ---------
        // ACT
        // ---------
        messagesToSend.forEach((msg, index) => {
            cy.get(`[data-test-id='message-input-box']`).type(msg)
            cy.get(`[data-test-id='send-message-btn']`).click()

            // ---------
            // ASSERT
            // ---------
            cy.get(`[data-test-id='message-${index}-sent-ctn']`).should('contain', msg)
        })
    });
});