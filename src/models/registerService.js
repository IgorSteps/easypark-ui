import axios from 'axios';

export async function registerUser(credentials) {
  try {
    console.debug("backend api endpoint is set to ", process.env.BASE_API_URL)
    const response = await axios.post(process.env.BASE_API_URL+'/register', credentials);
    
    console.debug("Got register response data", response.data)

    return response.data;
  } catch (error) {
    console.error('Failed to register user', error.response);
    throw new Error(error.response.data.error || 'An error occured');
  }
}
