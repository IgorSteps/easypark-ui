import axios from 'axios';

export async function registerUser(credentials) {
  try {
    console.debug("backend api endpoint is set to ", process.env.BASE_API_URL)
    const response = await axios.post(process.env.BASE_API_URL+'/register', credentials);
    
    console.debug("Got register response data", response.data)

    return response.data;
  } catch (error) {
    
    if (error.response) {
      console.error('Failed to register user', error.response);
      throw new Error(error.response.data || 'An error occurred')
    } else if (error.request) {
        console.error('Didn\'t receive response after making request to register user', error.request);
        throw new Error('no healthy upstream')
    } else {
        console.error('Failed to setup request to register user', error.message);
        throw new Error('An error occurred')
    }
  }
}
