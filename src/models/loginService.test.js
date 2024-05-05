import MockAdapter from 'axios-mock-adapter'
const { loginUser } = await import('./loginService');
import axios from 'axios';
import {jest} from '@jest/globals'
import { afterEach, beforeEach } from 'node:test';

describe('Login User model', () => {
  
  it('should return user data upon successful login', async () => {
    // --------
    // ASSEMBLE
    // --------
    global.sessionStorage = {
      setItem: jest.fn(),
    };
    var mock = new MockAdapter(axios);
    let responseData = { 
      user: {
        ID: 'f775a770-67ce-43ce-a640-89fac4055bb7',
        // other fields omitted...
      },
      token: 'token' 
    };
      
    let credentials = { username: 'testuser', password: 'testpassword' };
    mock.onPost(`${process.env.BASE_API_URL}/login`, credentials).reply(200, responseData);
    
    // ----
    // ACT
    // ----
    const userData = await loginUser(credentials);

    // ------
    // ASSERT
    // ------
    expect(sessionStorage.setItem).toHaveBeenCalledWith('token', responseData.token);
    expect(sessionStorage.setItem).toHaveBeenCalledWith('userId', responseData.user.ID);
    expect(userData).toEqual(responseData);
});

  it('should throw an error upon failed login', async () => {
    // --------
    // ASSEMBLE
    // --------
    global.sessionStorage = {
      setItem: jest.fn(),
    };
    var mock = new MockAdapter(axios);
    const error = 'boom';
    let credentials = { username: 'testuser', password: 'testpassword' };
    mock.onPost(`${process.env.BASE_API_URL}/login`, credentials).reply(400, error);
    
    // ----
    // ACT
    // ----
    await expect(loginUser(credentials)).rejects.toThrow('boom');

    // ------
    // ASSERT
    // ------
    expect(sessionStorage.setItem).not.toHaveBeenCalledWith();
    expect(sessionStorage.setItem).not.toHaveBeenCalledWith();
  });
});
