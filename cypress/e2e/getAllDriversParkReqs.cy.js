describe("List Driver's Parking Requests", () => {
    beforeEach(() => {
        cy.visit('http://localhost:9000/driver-dashboard'); // Assuming your form is rendered at the root URL '/'
    });

    it('Submits parking request successfully', () => {
        // --------
        // ASSEMBLE
        // --------
        // Create first parking request
        cy.get('[data-test-id=create-park-req-btn]').click();
        // Select start date and time
        cy.get('.react-datepicker__input-container > input').eq(0).click();
        cy.get('.react-datepicker__input-container > input').eq(0).type('2024-05-01 09:00');
        cy.get('[data-test-id=select-parking-lot]').select('cmp-2'); // click to select park lot again to exit calendar view

        // Select end date and time
        cy.get('.react-datepicker__input-container > input').eq(1).click();
        cy.get('.react-datepicker__input-container > input').eq(1).type('2024-05-01 17:00'); 
        cy.get('[data-test-id=select-parking-lot]').select('cmp-2'); // click to select park lot again to exit calendar view
                
        cy.get('[data-test-id=park-req-submit]').click();

        cy.get('[data-test-id=create-park-request-success-alert]').should('contain', 'Successfully created parking request');
        cy.get('[data-test-id=close-btn]').click();

        // Create second parking request
        cy.get('[data-test-id=create-park-req-btn]').click();
        // Select start date and time
        cy.get('.react-datepicker__input-container > input').eq(0).click();
        cy.get('.react-datepicker__input-container > input').eq(0).type('2024-05-01 09:00');
        cy.get('[data-test-id=select-parking-lot]').select('cmp-2'); // click to select park lot again to exit calendar view

        // Select end date and time
        cy.get('.react-datepicker__input-container > input').eq(1).click();
        cy.get('.react-datepicker__input-container > input').eq(1).type('2024-05-01 17:00'); 
        cy.get('[data-test-id=select-parking-lot]').select('cmp-2'); // click to select park lot again to exit calendar view
                
        cy.get('[data-test-id=park-req-submit]').click();

        cy.get('[data-test-id=create-park-request-success-alert]').should('contain', 'Successfully created parking request');
        cy.get('[data-test-id=close-btn]').click();
        
        const mockParkingRequests = [
            {
                ID: '7052f755-a3d1-4a8a-94ab-48a53370a998',
                UserID: 'null',
                DestinationParkingLotID: 'bb8625ea-8c80-484c-8a75-3386649eef25',
                StartTime: '2024-05-01 09:00',
                EndTime: '2024-05-01 17:00',
                Status: 'pending'
            },
            {
                ID: '7052f755-a3d1-4a8a-94ab-48a53370a998',
                UserID: 'null',
                DestinationParkingLotID: 'bb8625ea-8c80-484c-8a75-3386649eef25',
                StartTime: '2024-05-01 09:00',
                EndTime: '2024-05-01 17:00',
                Status: 'pending'
            }
        ];

        // ----
        // ACT
        // ----
        cy.wait(10000) // 10 seconds
        // ------
        // ASSERT
        // ------
        mockParkingRequests.forEach((request, index) => {
            cy.get(`[data-test-id=parking-request-id-${index}]`).should('contain', request.ID);
            cy.get(`[data-test-id=parking-request-user-id-${index}]`).should('contain', request.UserID);
            cy.get(`[data-test-id=parking-request-destination-lot-id-${index}]`).should('contain', request.DestinationParkingLotID);
            cy.get(`[data-test-id=parking-request-status-${index}]`).should('contain', request.Status);
        });
    });
});
