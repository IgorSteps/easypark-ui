import axios from 'axios';

/** loginService handles  authentication logic, interacting with the backend api */
export async function loginUser(credentials) {
  try {
    console.debug("backend api endpoint is set to ", process.env.BASE_API_URL)
    const response = await axios.post(process.env.BASE_API_URL+'/login', credentials);
    
    console.debug("Got login response data", response.data)
    // Store JWT in the session storage.
    sessionStorage.setItem('token', response.data.token);

    return response.data;
  } catch (error) {
    // Not 2xx responses.
    console.error('Failed to login', error.response);
    if (error.response.status !== 500){
      throw new Error(error.response.data.error || 'No account found');
    }
    throw new Error(error.response.data.error || 'An error occurred');
  }
}
