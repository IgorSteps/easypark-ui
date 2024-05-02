import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
    },

    // Seeding mock server with stuff...
    seeds(server) {
      server.create('user', { username: 'user1', password: 'password1' });
      server.create('user', { username: 'user2', password: 'password2' });
    },

    routes() {
        // Mock login route.
        this.post('/login', (schema, request) => {
            let attrs = JSON.parse(request.requestBody);
            let user = schema.users.findBy(attrs);
            if (user) {
            return new Response(200, {}, { token: 'mock-token' });
            } else {
            return new Response(401, {}, { error: 'Invalid credentials' } )
            }
        });
    },
  });

  return server;
}
