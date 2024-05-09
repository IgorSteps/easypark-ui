import MockAdapter from 'axios-mock-adapter'
const { createParkingLot } = await import('./createParkingLotService');
import axios from 'axios';
import {jest} from '@jest/globals'

process.env.BASE_API_URL = 'http://localhost:8080';

describe('Create parking lot model', () => {
    global.sessionStorage = {
        setItem: jest.fn(),
      };
      beforeEach(() => {
          global.sessionStorage = {
              getItem: jest.fn((key) => {
                  if (key === 'userId') return 'a4a05cb9-1e8d-42e5-894c-4fbdac7c3ffe';
                  if (key === 'token') return 'token';
                  return null;
              }),
          };
      });
  it('should return the new parking lot\'s details upon successfully creating a parking lot', async () => {
    // --------
    // ASSEMBLE
    // --------
    var mock = new MockAdapter(axios);
    let spacesArray = [];
    let responseData = { ID: '1234', name: 'test car park', capacity: 100, pakringSpaces: spacesArray};
    let parkingLotDetails = { name: 'test car park', capacity: 100 };
    mock.onPost(`${process.env.BASE_API_URL}/parking-lots`, parkingLotDetails).reply(200, responseData);
    
    // ----
    // ACT
    // ----
    const newParkingLotDetails = await createParkingLot(parkingLotDetails);

    // ------
    // ASSERT
    // ------

    expect(newParkingLotDetails).toEqual(responseData);
});
});
