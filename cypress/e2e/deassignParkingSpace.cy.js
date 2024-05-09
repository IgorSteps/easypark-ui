import { FormatDateTime } from '../../src/views/utils/time';

describe("Clicking deassign button on Parking Request", () => {
    beforeEach(() => {
        cy.cleanDB()
        cy.populateWithDrivers()
        cy.createAdmin()
        cy.login('adminUsername', 'securePassword');
    });

    afterEach(() => {
       cy.cleanDB()
    });

    it('should deassign parking space and change status to pending', () => {
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

            // Approve which should assign space.
            cy.get(`[data-test-id=parking-request-0-approve-btn]`).click()
            // Assert that it happened.
            cy.get(`[data-test-id=parking-request-0-status]`).should('contain', 'approved')
            cy.get(`[data-test-id=parking-request-0-space-name]`).should('contain', 'cmp-1')
            cy.get(`[data-test-id=parking-request-0-assign-success-alert]`).should('contain', "Successfully approved request and assigned a space.")

            // --------
            // ACT
            // --------
            cy.get(`[data-test-id=parking-request-0-deassign-btn]`).click()

            // --------
            // ASSERT
            // --------
            cy.wait(3000) // wait 3 secs to refetch parking requests
            cy.get(`[data-test-id=parking-request-0-status]`).should('contain', 'pending')
            cy.get(`[data-test-id=parking-request-0-space-name]`).should('not.exist')            
    });
});
