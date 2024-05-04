describe('Parking Request Form', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9000/driver-dashboard'); // Assuming your form is rendered at the root URL '/'
    });

    it('Submits parking request successfully', () => {
        // --------
        // ASSEMBLE
        // --------
        cy.get('[data-test-id=create-park-req-btn]').click();
        
        // Select start date and time
        cy.get('.react-datepicker__input-container > input').eq(0).click();
        cy.get('.react-datepicker__input-container > input').eq(0).type('2024-05-01 09:00');
        cy.get('[data-test-id=select-parking-lot]').select('cmp-2'); // click to select park lot again to exit calendar view

        // Select end date and time
        cy.get('.react-datepicker__input-container > input').eq(1).click();
        cy.get('.react-datepicker__input-container > input').eq(1).type('2024-05-01 17:00'); 
        cy.get('[data-test-id=select-parking-lot]').select('cmp-2'); // click to select park lot again to exit calendar view
        
        // -----
        // ACT
        // -----
        cy.get('[data-test-id=park-req-submit]').click();

        // -------
        // ASSERT
        // -------
        cy.get('[data-test-id=create-park-request-success-alert]').should('contain', 'Successfully created parking request');
    });
});
