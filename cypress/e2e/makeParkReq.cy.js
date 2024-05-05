describe('Parking Request Form', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('http://localhost:9000/driver-dashboard');
    });

    it('Submits parking request successfully', () => {
        // --------
        // ASSEMBLE
        // --------
        cy.get('[data-test-id=create-park-req-btn]').click();
        
        // Select start date and time
        cy.get('.react-datepicker__input-container > input').eq(0).click();
        cy.get('.react-datepicker__day--023').click()
        cy.get('[data-test-id=select-parking-lot]').select('cmp')

        // Select end date and time
        cy.get('.react-datepicker__input-container > input').eq(1).click();
        cy.get('.react-datepicker__day--024').click()
        cy.get('[data-test-id=select-parking-lot]').select('cmp'); // click to select park lot again to exit calendar view
       //<div class="react-datepicker__day react-datepicker__day--005 react-datepicker__day--selected react-datepicker__day--today react-datepicker__day--weekend" tabindex="0" aria-label="Choose Sunday, May 5th, 2024" role="option" title="" aria-disabled="false" aria-current="date" aria-selected="true">5</div>
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
