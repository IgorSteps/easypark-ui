import { jest } from '@jest/globals';
import MockAdapter from 'axios-mock-adapter'
const { loginUser } = await import('./loginService');
import axios from 'axios';

process.env.BASE_API_URL = 'http://localhost:8080';

describe('Login User model', () => {
  it('should return user data upon successful login', async () => {
    // --------
    // ASSEMBLE
    // --------
    var mock = new MockAdapter(axios);
    let responseData = { username: 'testuser', email: 'test@example.com' };
    let credentials = { username: 'testuser', password: 'testpassword' };
    mock.onPost(`${process.env.BASE_API_URL}/login`, credentials).reply(200, responseData);
    
    // ----
    // ACT
    // ----
    const userData = await loginUser(credentials);

    // ------
    // ASSERT
    // ------
    expect(userData).toEqual(responseData);
});

  it('should throw an error upon failed login', async () => {
    // --------
    // ASSEMBLE
    // --------
    var mock = new MockAdapter(axios);
    const errorMessage = 'boom';
    const errorResponse = { response: { data: { error: errorMessage } } };    let credentials = { username: 'testuser', password: 'testpassword' };
    mock.onPost(`${process.env.BASE_API_URL}/login`, credentials).reply(400, { error: errorMessage });
    
    // ----
    // ACT and ASSERT
    // ----
    await expect(loginUser(credentials)).rejects.toThrow(errorMessage);
  });
});
