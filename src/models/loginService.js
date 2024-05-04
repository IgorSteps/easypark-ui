import axios from 'axios';

/** loginService handles  authentication logic, interacting with the backend api */
export async function loginUser(credentials) {
  try {
    const response = await axios.post(process.env.BASE_API_URL+'/login', credentials);
    
    if (response.data.token === '' || response.data.token === undefined) {
      console.warn("got empty or undefined token from server")
      // TODO: Handle this properly.
    }
    // Store JWT and User ID in the session storage.
    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('userId', response.data.user.ID);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Failed to get login user', error.response);
      throw new Error(error.response.data || 'an error occurred')
    } else if (error.request) {
      console.error('Failed to receive response after making request login user', error.request);
      throw new Error('an error occurred')
    } else {
      console.log('Failed to setup request', error.message);
      throw new Error('an error occurred')
    }
  }
}
