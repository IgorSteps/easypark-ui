import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';
import {jest} from '@jest/globals'
import { createNotification } from './notification';

describe('createNotification', () => {
    // Reset sessionStorage mock for each test
    beforeEach(() => {
        global.sessionStorage = {
            getItem: jest.fn((key) => {
                if (key === 'userId') return 'a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe';
                if (key === 'token') return 'token';
                return null;
            }),
        };
    });

    it('should create notification', async () => {
        // --------
        // ASSEMBLE
        // --------
        var mock = new MockAdapter(axios);
        let request = {
            requestID: "5583980e-b2cd-4dc2-bd1e-706386454cab",
            parkingSpaceID: "61923af2-5ba8-418f-aa4f-dc365c037e0f",
            location: "cmp-1",
            notificationType: 0 // arrival.
        }

        let responseData = {
            ID:"a678f5a6-9731-4741-ad0b-de5efbbffc9b",
            Type: 0,
            DriverID:"a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe",
            ParkingSpaceID:"61923af2-5ba8-418f-aa4f-dc365c037e0f",
            Location:"cmp-1",
            Timestamp:"0000-12-31T23:58:45-00:01",
          }

        mock.
            onPost(`${process.env.BASE_API_URL}/drivers/a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe/notifications`).
            reply(200, responseData);
        
        // ----
        // ACT
        // ----
        const notification = await createNotification(request);

        // ------
        // ASSERT
        // ------
        expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
        expect(sessionStorage.getItem).toHaveBeenCalledWith('userId');
        expect(notification.ParkingSpaceID).toEqual(responseData.ParkingSpaceID);
        expect(notification.DriverID).toEqual('a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe');
        expect(notification.Type).toEqual(responseData.Type);
    });
});
