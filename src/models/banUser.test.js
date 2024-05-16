import MockAdapter from 'axios-mock-adapter'
const { banUser } = await import('./banUser');
import axios from 'axios';
import {jest} from '@jest/globals'

process.env.BASE_API_URL = 'http://localhost:8080';

describe('Ban user model', () => {
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
  it('should return a message upon successfully banning a user', async () => {
    // --------
    // ASSEMBLE
    // --------
    var mock = new MockAdapter(axios);
    const banInfo = {id:"1234",request:"ban"};
    let responseData = {message:"Successfully banned user"};
    mock.onPatch(`${process.env.BASE_API_URL}/drivers/${banInfo.id}/status`,banInfo).reply(200, responseData);
    
    // ----
    // ACT
    // ----
    const banUserResult = await banUser(banInfo);

    // ------
    // ASSERT
    // ------

    expect(banUserResult).toEqual(responseData);
});
});
