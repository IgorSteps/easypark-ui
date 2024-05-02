import axios from 'axios';

/** loginService handles  authentication logic, interacting with the backend api */
export async function loginUser(credentials) {
  try {
    console.debug("backend api endpoint is set to ", process.env.BASE_API_URL)
    const response = await axios.post(process.env.BASE_API_URL+'/login', credentials);
    return response.data;
  } catch (error) {
    // Not 2xx responses.
    console.error('Failed to login', error.response);
    throw new Error(error.response.data.error || 'An error occurred');
  }
}
