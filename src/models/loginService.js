import axios from 'axios';

/** loginService handles  authentication logic, interacting with the backend api */
export async function loginUser(credentials) {
  try {
    console.debug("backend api endpoint is set to ", process.env.BASE_API_URL)
    const response = await axios.post(process.env.BASE_API_URL+'/login', credentials);
    
    console.debug("Got login response data", response.data)
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
