import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    seeds(server) {
      server.create('user', { username: 'hi', password: 'hi' });
      // Add more seeded users if necessary...
    },

    routes() {
      //this.namespace = 'api';
      this.post('/login', (schema, request) => {
        console.debug("got hit")
        let attrs = JSON.parse(request.requestBody);
        let user = schema.users.findBy({ username: attrs.Username });

        if (user && user.password === attrs.Password) {
          return new Response(200, { 'Content-Type': 'application/json' }, {
            token: 'fake-jwt-token',
            user: user.attrs
          });
        } else {
          return new Response(401, { 'Content-Type': 'application/json' }, {
            error: 'Invalid username or password'
          });
        }
      });

      // Other routes to come...
    },
  });

  return server;
}
