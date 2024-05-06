import { FormatDateTime } from '../../src/views/utils/time';

describe("List Driver's Parking Requests", () => {
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

        const requests = [
            {
            destinationLotID: parkLotID,
            destinationLotName: 'cmp',
            startTime: '2025-11-01T09:00:00.000Z',
            endTime: '2025-12-01T09:00:00.000Z'
            },
            {
                destinationLotID: parkLotID,
                destinationLotName: 'cmp',
                startTime: '2025-11-01T09:00:00.000Z',
                endTime: '2025-12-01T09:00:00.000Z'
            }
        ];

        
        // --------
        // ACT
        // --------
        requests.forEach((request) => cy.createParkingRequest(request));
        cy.wait(10000) // wait 10 seconds

        // --------
        // ASSERT
        // -------- 
        requests.forEach((req, index) => {
            cy.get(`[data-test-id=parking-request-${index}-lot-name]`).should('contain', req.destinationLotName);
            cy.get(`[data-test-id=parking-request-${index}-start-time]`).should('contain', FormatDateTime(req.startTime));
            cy.get(`[data-test-id=parking-request-${index}-end-time]`).should('contain', FormatDateTime(req.endTime));
            cy.get(`[data-test-id=parking-request-${index}-status]`).should('contain', "pending");
        })
    });
});
