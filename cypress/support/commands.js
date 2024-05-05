Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8080/login',
        body: {
            username: 'user1',
            password: 'securepassword'
        }
    }).then((resp) => {
        cy.window().then((win) => {
            win.sessionStorage.setItem('token', resp.body.token);
            win.sessionStorage.setItem('userId', resp.body.user.ID);
        });
    });
});
