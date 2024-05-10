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
    var mock = new MockAdapter(axios);
    let responseData = { message: 'good'};
    let userDetails = { firstname:'test1', lastname: 'test2', username:'testuser2', password: 'testpassword' };
    mock.onPost(`${process.env.BASE_API_URL}/register`, userDetails).reply(200, responseData);
    
    // ----
    // ACT
    // ----
    const userData = await registerUser(userDetails);

    // ------
    // ASSERT
    // ------
    expect(userData).toEqual(responseData);
});

  it('should throw an error upon failed registration', async () => {
    // --------
    // ASSEMBLE
    // --------
    var mock = new MockAdapter(axios);
    const errorMessage = 'boom';
    const error = { response: { data: errorMessage } };
    let userDetails = { firstname:'test2', lastname: 'test3', username:'testuser', password: 'testpassword2' };
    mock.onPost(`${process.env.BASE_API_URL}/register`, userDetails).reply(400, errorMessage);
    
    // ----
    // ACT and ASSERT
    // ----
    await expect(registerUser(userDetails)).rejects.toThrow('boom');

  });
});
