import MockAdapter from 'axios-mock-adapter'
import axios from 'axios';
import {jest} from '@jest/globals'
import { getAllParkingLots } from './parkingLot';

describe('getAllParkingLots', () => {
  
    it('should return all parking lots', async () => {
        // --------
        // ASSEMBLE
        // --------
        global.sessionStorage = {
        getItem: jest.fn(),
        };
        var mock = new MockAdapter(axios);
        let responseData = { 
        ID: 'f775a770-67ce-43ce-a640-89fac4055bb7',
        Name: 'cmp',
        // other fields omitted...
        };
        
        mock.onGet(`${process.env.BASE_API_URL}/driver-parking-lots`).reply(200, responseData);
        
        // ----
        // ACT
        // ----
        const parkingLots = await getAllParkingLots();

        // ------
        // ASSERT
        // ------
        expect(sessionStorage.getItem).toHaveBeenCalledWith('token');
        expect(parkingLots).toEqual(responseData);
    });

    it('should return error', async () => {
        // --------
        // ASSEMBLE
        // --------
        global.sessionStorage = {
        getItem: jest.fn(),
        };
        var mock = new MockAdapter(axios);
        let error = "booms"
        mock.onGet(`${process.env.BASE_API_URL}/driver-parking-lots`).reply(400, error);
        
        // --------------
        // ACT and ASSERT
        // --------------
        await expect(getAllParkingLots()).rejects.toThrow('boom');
    });
});
