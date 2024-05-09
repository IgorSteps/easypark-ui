import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';
import {jest} from '@jest/globals'
import { createParkingRequest, getAllDriversParkingRequests } from './parkingRequest';

describe('createParkingRequest', () => {
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

    it('should create parking requests', async () => {
        // --------
        // ASSEMBLE
        // --------
        var mock = new MockAdapter(axios);
        let request = {
            destinationLotID: "ss"
        }
        let responseData = { 
            ID: 'f775a770-67ce-43ce-a640-89fac4055bb7',
            UserID: 'a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe',
            // other fields omitted...
        };

        mock.
            onPost(`${process.env.BASE_API_URL}/drivers/a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe/parking-requests`).
            reply(200, responseData);
        
        // ----
        // ACT
        // ----
        const parkrReq = await createParkingRequest(request);

        // ------
        // ASSERT
        // ------
        expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
        expect(sessionStorage.getItem).toHaveBeenCalledWith('userId');
        expect(parkrReq).toEqual(responseData);
    });

    it('should return error if request fails', async () => {
        // --------
        // ASSEMBLE
        // --------
        var mock = new MockAdapter(axios);
        let request = {
            destinationLotID: "ss"
        }
        let error = "boom"
        mock.
            onPost(`${process.env.BASE_API_URL}/drivers/a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe/parking-requests`).
            reply(400, error);
        
        // --------------
        // ACT and ASSERT
        // --------------
        await expect(createParkingRequest(request)).rejects.toThrow('boom');
    });

    it('should return error if no destination is provided', async () => {
        // --------
        // ASSEMBLE
        // --------
        let request = {
            destinationD: '' // empty
        }
        let error = "Please choose destination"
        
        // --------------
        // ACT and ASSERT
        // --------------
        await expect(createParkingRequest(request)).rejects.toThrow(error);
    });
});

describe('getAllParkingRequests', () => {
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

    it('should return all parking requests', async () => {
        // --------
        // ASSEMBLE
        // --------
        var mock = new MockAdapter(axios);
        let request = {
            destination: "ss"
        }
        let responseData = { 
            ID: 'f775a770-67ce-43ce-a640-89fac4055bb7',
            UserID: 'a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe',
            // other fields omitted...
        };

        mock.
            onGet(`${process.env.BASE_API_URL}/drivers/a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe/parking-requests`).
            reply(200, responseData);
        
        // ----
        // ACT
        // ----
        const parkReqs = await getAllDriversParkingRequests();

        // ------
        // ASSERT
        // ------
        expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
        expect(sessionStorage.getItem).toHaveBeenCalledWith('userId');
        expect(parkReqs).toEqual(responseData);
    });

    it('should return error', async () => {
        // --------
        // ASSEMBLE
        // --------
        var mock = new MockAdapter(axios);
       
        let error = "boom"
        mock.
            onGet(`${process.env.BASE_API_URL}/drivers/a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe/parking-requests`).
            reply(400, error);
        
        // --------------
        // ACT and ASSERT
        // --------------
        await expect(getAllDriversParkingRequests()).rejects.toThrow('boom');
    });
});