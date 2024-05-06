describe('Notify Arrival Form', () => {
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

    it('successfully creates notification', () => {
        // --------
        // ASSEMBLE
        // --------
        // Create parking lot.
        const requestLotData = {
            name: "cmp",
            capacity: 10
        }
        cy.createParkingLot(requestLotData).then((lot) => {
            const parkLotID =  lot.id;
            const parkingSpaceID = lot.parkingSpaces[0].ID;
            const parkingSpaceName = lot.parkingSpaces[0].Name;

            cy.log(`Parking Lot ID: ${parkLotID}`);
            cy.log(`Parking Space ID: ${parkingSpaceID}`);
            cy.log(`Parking Space Name: ${parkingSpaceName}`);

            // Login driver.
            cy.login('user1', 'securepassword');
            
            // Create parking request.
            const request = {
                destinationLotID: parkLotID,
                destinationLotName: 'cmp',
                startTime: '2025-11-01T09:00:00.000Z',
                endTime: '2025-12-01T09:00:00.000Z'
            };
            cy.createParkingRequest(request).then((parkReq) => {
                const parkingReqID = parkReq.id // store parking request id for later use
                cy.log(`Parking Request ID: ${parkingReqID}`);

                cy.wait(11000) // wait 11 seconds for them to be fetched

                // Login admin.
                cy.login('adminUsername', 'securePassword');
                // Assign parking space to the request.
                const reqData = {
                    parkingSpaceID: parkingSpaceID
                }
                cy.assignParkingSpace(parkingReqID,reqData)

                // Login driver.
                cy.login('user1', 'securepassword');                
                cy.wait(11000) // wait 11 seconds for latest parking requests them to be fetched

                // Assert that Assigned Parking Space name shows up.
                // This asserts a get single park space request works/
                cy.get(`[data-test-id="parking-request-0-space-name"]`).should('contain', parkingSpaceName)

                // Create notification
                cy.get(`[data-test-id="parking-request-0-notify-btn"]`).click()
                cy.get(`[data-test-id="select-notification-type"]`).select("Arrival")
                cy.get(`[data-test-id="notification-location-input"]`).type(parkingSpaceName)

                // ---
                // ACT
                // ---
                cy.get(`[data-test-id="notification-submit-btn"]`).click()

            
                // ------
                // ASSERT
                // ------
                cy.get(`[data-test-id="notification-success-alert"]`).should('contain', 'Successfully created notification'); 
            });
        })
    });
});