import axios from 'axios';

/** loginService handles  authentication logic, interacting with the backend api */
export async function loginUser(credentials) {
  try {
    console.debug("backend api endpoint is set to ", process.env.BASE_API_URL)
    const response = await axios.post(process.env.BASE_API_URL+'/login', credentials);
    
    console.debug("got login response data", response.data)
    if (response.data.token === '' || response.data.token === undefined) {
      console.warn("got empty or undefined token from server")
    }

    // Store JWT and User ID in the session storage.
    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('userId', response.data.user.ID);

    return response.data;
  } catch (error) {
    // Not 2xx responses.
    console.error('Failed to login', error.response);
    throw new Error(error.response.data || 'An error occurred');
  }
}
