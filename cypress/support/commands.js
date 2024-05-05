Cypress.Commands.add('login', (uname, pword) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/login',
        body: {
            username: uname,
            password: pword
        }
    }).then((resp) => {
        cy.window().then((win) => {
            win.sessionStorage.setItem('token', resp.body.token);
            win.sessionStorage.setItem('userId', resp.body.user.ID);
        });
    });
});

Cypress.Commands.add('createParkingRequest', (requestData) => {
    cy.window().then((win) => {
        const token = win.sessionStorage.getItem('token');
        const userId = win.sessionStorage.getItem('userId');

        cy.request({
            method: 'POST',
            url: `http://localhost:8080/drivers/${userId}/parking-requests`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: requestData
        }).then((resp) => {
            expect(resp.status).to.eq(201); // Assert 201 status.
            return resp.body;
        });
    });
});

Cypress.Commands.add('createParkingLot', (requestData) => {
    cy.window().then((win) => {
        const token = win.sessionStorage.getItem('token');

        cy.request({
            method: 'POST',
            url: `http://localhost:8080/parking-lots`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: requestData
        }).then((resp) => {
            expect(resp.status).to.eq(201); // Assert 201 status.
            return resp.body;
        });
    });
});

Cypress.Commands.add('createAdmin', () => {
    cy.exec('npm run create-admin')
});

Cypress.Commands.add('cleanDB', () => {
    cy.exec('npm run clean-db')
});

Cypress.Commands.add('populateWithDrivers', () => {
    cy.exec('npm run populate-db')
});