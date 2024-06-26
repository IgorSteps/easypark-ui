import { FormatDateTime } from '../../src/views/utils/time';

describe("Clicking Approve button on Parking Request", () => {
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

    it('should approve it', () => {
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
       
            cy.wait(3000)

            cy.log("Parking Lot ID " + parkLotID)
            // Create parking request
            cy.login('user1', 'securepassword');
            const request = {
                destinationLotID: parkLotID,
                destinationLotName: 'cmp',
                startTime: '2025-11-01T09:00:00.000Z',
                endTime: '2025-12-01T09:00:00.000Z'
            };
            cy.createParkingRequest(request)
            cy.wait(1000) // wait 10 seconds
            
            cy.login('adminUsername', 'securePassword');
            cy.visit('http://localhost:9000/admin-parking-requests')

            
            cy.get(`[data-test-id=parking-request-0-lot-name]`).should('contain', request.destinationLotName);
            cy.get(`[data-test-id=parking-request-0-start-time]`).should('contain', FormatDateTime(request.startTime));
            cy.get(`[data-test-id=parking-request-0-end-time]`).should('contain', FormatDateTime(request.endTime));
            cy.get(`[data-test-id=parking-request-0-status]`).should('contain', "pending");
            });
            // --------
            // ACT
            // --------
            cy.get(`[data-test-id=parking-request-0-approve-btn]`).click()

            // --------
            // ASSERT
            // --------
            cy.get(`[data-test-id=parking-request-0-assign-success-alert]`).should('contain', "Successfully approved request and assigned a space.")

            cy.wait(11000) // wait 11 secs to refetch parking requests

            cy.get(`[data-test-id=parking-request-0-status]`).should('contain', 'approved')
            cy.get(`[data-test-id=parking-request-0-space-name]`).should('contain', 'cmp-1')
    });
});
