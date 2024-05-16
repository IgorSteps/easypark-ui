describe('Message Driver Form', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.createAdmin()
        cy.populateWithDrivers();
        cy.login('adminUsername', 'securePassword');
        cy.visit('http://localhost:9000/admin-dashboard');
    });

    afterEach(() => {
       cy.cleanDB()
    });

    it('successfully messages driver', () => {
        // ---------
        // ASSEMBLE
        // ---------
        const messagesToSend = [
            "hi",
            "how are you",
            "how can I help you"
        ]

        cy.visit('http://localhost:9000/manage-drivers')

        cy.get('[data-test-id="driver-0-message-btn"]').click();

       

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
