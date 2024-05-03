import MockAdapter from 'axios-mock-adapter'
const { registerUser } = await import('./registerService');
import axios from 'axios';
import {jest} from '@jest/globals'

process.env.BASE_API_URL = 'http://localhost:8080';

describe('Register User model', () => {
  it('Should return user data upon successfully registering', async () => {
    // --------
    // ASSEMBLE
    // --------
    global.sessionStorage = {
      setItem: jest.fn(),
    };
    var mock = new MockAdapter(axios);
    let responseData = { message: 'good'};
    let credentials = { firstname:'test1', lastname: 'test2', username:'testuser2', password: 'testpassword' };
    mock.onPost(`${process.env.BASE_API_URL}/register`, credentials).reply(200, responseData);
    
    // ----
    // ACT
    // ----
    const userData = await registerUser(credentials);

    // ------
    // ASSERT
    // ------
    expect(userData).toEqual(responseData);
});

  it('should throw an error upon failed registration', async () => {
    // --------
    // ASSEMBLE
    // --------
    global.sessionStorage = {
      setItem: jest.fn(),
    };
    var mock = new MockAdapter(axios);
    const errorMessage = 'boom';
    const errorResponse = { response: { data: { error: errorMessage } } };    let credentials = { firstname:'test2', lastname: 'test3', username:'testuser', password: 'testpassword2' };
    mock.onPost(`${process.env.BASE_API_URL}/register`, credentials).reply(400, { error: errorMessage });
    
    // ----
    // ACT and ASSERT
    // ----
    await expect(registerUser(credentials)).rejects.toThrow(errorMessage);
  });
});
