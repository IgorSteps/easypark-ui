import MockAdapter from 'axios-mock-adapter'
const { deleteParkingLot } = await import('./deleteParkingLot');
import axios from 'axios';
import {jest} from '@jest/globals'

process.env.BASE_API_URL = 'http://localhost:8080';

describe('Delete parking lot model', () => {
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
  it('should return a message upon successfully deleting a parking lot', async () => {
    // --------
    // ASSEMBLE
    // --------
    var mock = new MockAdapter(axios);
    const lotID = "123"
    let responseData = {message:"Successfully deleted parking lot"};
    mock.onDelete(`${process.env.BASE_API_URL}/parking-lots/${lotID}`).reply(200, responseData);
    
    // ----
    // ACT
    // ----
    const deleteParkingLotResult = await deleteParkingLot(lotID);

    // ------
    // ASSERT
    // ------

    expect(deleteParkingLotResult).toEqual(responseData);
});
});
