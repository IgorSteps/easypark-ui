describe('Parking Request Form', () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.populateWithDrivers()
        cy.createAdmin()
        cy.login('adminUsername', 'securePassword');
        cy.visit('http://localhost:9000/driver-dashboard');
    });

    afterEach(() => {
       cy.cleanDB()
    });

    it('Submits parking request successfully', () => {
        // --------
        // ASSEMBLE
        // --------
        // Create parking lot.
        const requestLotData = {
            name: "cmp",
            capacity: 10
        }
        let parkLotID;
        cy.createParkingLot(requestLotData).then((lot) => {
            console.debug(lot.ID);
            parkLotID = lot.ID
        });

        // Login driver.
        cy.login('user1', 'securepassword');

        cy.get('[data-test-id=create-park-req-btn]').click();
        
        // Select start date and time
        cy.get('.react-datepicker__input-container > input').eq(0).click();
        cy.get('.react-datepicker__day--023').click()
        cy.get('[data-test-id=select-parking-lot]').select('cmp') // click to select park lot again to exit calendar view

        // Select end date and time
        cy.get('.react-datepicker__input-container > input').eq(1).click();
        cy.get('.react-datepicker__day--024').click()
        cy.get('[data-test-id=select-parking-lot]').select('cmp'); // click to select park lot again to exit calendar view

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
