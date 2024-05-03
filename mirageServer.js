import { createServer, Model, Response } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      user: Model,
      parkingRequest: Model,
      parkingLot: Model,
    },

    // Seeding mock server with mock data.
    seeds(server) {
      server.create('user', { username: 'user1', password: 'password1' });
      server.create('user', { username: 'user2', password: 'password2' });
      server.create('parkingRequest', 
        {
          ID:"8275277b-0ec2-4cbf-9129-79a76194fe2e",
          UserID:"413662b8-0214-4935-a022-175438e6c4f1",
          ParkingSpaceID:null,
          DestinationParkingLotID:"714a2875-d358-423b-83b2-72a701a82492",
          StartTime:"2024-04-06T16:59:09.441792+01:00",
          EndTime:"2024-04-06T16:59:09.441792+01:00",
          Status:"pending"
        }
      );
      server.create('parkingRequest', 
        {
          ID:"8275277b-0ec2-4cbf-9129-79a76194fe2e",
          UserID:"413662b8-0214-4935-a022-175438e6c4f1",
          ParkingSpaceID:null,
          DestinationParkingLotID:"714a2875-d358-423b-83b2-72a701a82492",
          StartTime:"2024-04-06T16:59:09.441792+01:00",
          EndTime:"2024-04-06T16:59:09.441792+01:00",
          Status:"pending"
        }
      );
      server.create('parkingLot',
        {
          "ID":"bb8625ea-8c80-484c-8a75-3386649eef25",
          "Name":"cmp",
          "Capacity":10,
          "ParkingSpaces":[
            {
              "ID":"a678f5a6-9731-4741-ad0b-de5efbbffc9b",
              "ParkingLotID":"bb8625ea-8c80-484c-8a75-3386649eef25",
              "Name":"cmp-1",
              "Status":"blocked",
              "ParkingRequests":[{}]
            },
          ],
          "Available":0,
          "Occupied":0,
          "Reserved":0,
          "Blocked":0
        }
      );
      server.create('parkingLot',
        {
          "ID":"bb8625ea-8c80-484c-8a75-3386649eef25",
          "Name":"cmp-2",
          "Capacity":10,
          "ParkingSpaces":[
            {
              "ID":"a678f5a6-9731-4741-ad0b-de5efbbffc9b",
              "ParkingLotID":"bb8625ea-8c80-484c-8a75-3386649eef25",
              "Name":"cmp-1",
              "Status":"blocked",
              "ParkingRequests":[{}]
            },
          ],
          "Available":0,
          "Occupied":0,
          "Reserved":0,
          "Blocked":0
        }
      );
    },

    routes() {
        // Mock login route.
        this.post('/login', (schema, request) => {
            let attrs = JSON.parse(request.requestBody);
            let user = schema.users.findBy(attrs);
            if (user) {
              return new Response(200, {}, { token: 'mock-token', userId: 'e45d6927-ecdc-42a3-ac0f-63edcb9d9921' });
            } else {
              return new Response(401, {}, { error: 'Invalid credentials' } )
            }
        });

         // Mock route for creating parking requests.
        this.post('/drivers/:id/parking-requests', (schema, request) => {
          const driverId = request.params.id;
          const requestBody = JSON.parse(request.requestBody);

          return schema.parkingRequests.create(
            {
              ID: "7052f755-a3d1-4a8a-94ab-48a53370a998",
              UserID: driverId,
              DestinationParkingLotID: requestBody.destination,
              ParkingSpaceID: null,
              StartTime: requestBody.startTime,
              EndTime: requestBody.endTime,
              Status: 'pending',
            }
          );
        });

        // Mock route to get drivers parking requests
        this.get('/drivers/:id/parking-requests', (schema, request) => {
          const userId = request.params.id;

          return schema.parkingRequests.where({UserID: userId})
        })

        // Mock route to get all parking lots
        this.get('/parking-lots', (schema, request) => {
          return schema.parkingLots.all()
        })
    },
  });

  return server;
}
