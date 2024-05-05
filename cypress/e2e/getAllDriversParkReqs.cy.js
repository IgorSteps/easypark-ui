
describe("List Driver's Parking Requests", () => {
    beforeEach(() => {
        cy.populateWithDrivers()
        cy.createAdmin()
        cy.login('adminUsername', 'securePassword');
        cy.visit('http://localhost:9000/driver-dashboard');
    });

    afterEach(() => {
       cy.cleanDB()
    });

    it('should show all drivers parking requests', () => {
        // --------
        // ASSEMBLE
        // --------
        const requestLotData = {
            name: "cmp",
            capacity: 10
        }
        let parkLotID;
        cy.createParkingLot(requestLotData).then((lot) => {
            console.debug(lot.ID);
            parkLotID = lot.ID
        });

        cy.login('user1', 'securepassword');

        const requestData = {
            destinationLotID: parkLotID,
            destinationLotName: 'cmp',
            startTime: '2025-11-01T09:00:00.000Z',
            endTime: '2025-12-01T09:00:00.000Z'
        };

        const formatDateTime = (datetimeString) => {
            const date = new Date(datetimeString);
            return date.toLocaleString();
        };
        
        // --------
        // ACT
        // --------
        cy.createParkingRequest(requestData);

        cy.wait(10000) // wait 10 seconds

        // --------
        // ASSERT
        // --------
        cy.get(`[data-test-id=parking-request-destination-lot-name-0]`).should('contain', requestData.destinationLotName);
        cy.get(`[data-test-id=parking-request-start-time-0]`).should('contain', formatDateTime(requestData.startTime));
        cy.get(`[data-test-id=parking-request-end-time-0]`).should('contain', formatDateTime(requestData.endTime));
        cy.get(`[data-test-id=parking-request-status-0]`).should('contain', "pending");
    });
});
