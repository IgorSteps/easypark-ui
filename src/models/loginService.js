import axios from 'axios';

/** loginService handles  authentication logic, interacting with the backend api */
export async function loginUser(credentials) {
  try {
    const response = await axios.post(process.env.BASE_API_URL+'/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}
