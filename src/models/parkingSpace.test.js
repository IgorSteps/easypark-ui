import { getSingleParkingSpace } from '../models/parkingSpace.js';
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';
import {jest} from '@jest/globals'

describe('getSingleParkingSpace', () => {
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
    it('should return single parking space', async () => {
        // --------
        // ASSEMBLE
        // --------
        
        var mock = new MockAdapter(axios);
        let responseData = { 
            ID: 'f775a770-67ce-43ce-a640-89fac4055bb7',
            Name: 'cmp',
            // other fields omitted...
        };
        let parkingSpaceID = '50276fca-57f0-42df-a908-ca979953d02f'
        
        mock.onGet(`${process.env.BASE_API_URL}/driver/parking-spaces/`+parkingSpaceID).reply(200, responseData);
        
        // ----
        // ACT
        // ----
        const parkingSpace = await getSingleParkingSpace(parkingSpaceID);

        // ------
        // ASSERT
        // ------
        expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
        expect(parkingSpace).toEqual(responseData);
    });

});