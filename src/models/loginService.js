import axios from 'axios';

/** loginService handles  authentication logic, interacting with the backend api */
export async function loginUser(credentials) {
  try {
    console.debug("backend api endpoint is set to ", process.env.BASE_API_URL)
    const response = await axios.post(process.env.BASE_API_URL+'/login', credentials);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that is not in the range of 2xx
      console.error('Error status', error.response.status);  // Log status code
      throw new Error(error.response.data.message || 'An error occurred');  // Use server's error message
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received');
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
      throw new Error('Error setting up your request');
    }
  }
}
