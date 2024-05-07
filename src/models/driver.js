import axios from 'axios';

export async function getAllDrivers() {
    try {
      const response = await axios.get(process.env.BASE_API_URL+`/drivers`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to get all drivers', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Didnt receive response after making request get all drivers', error.request);
        throw new Error('an error occurred')
      } else {
        console.log('Failed to setup request to get all drivers', error.message);
        throw new Error('an error occurred')
      }
    }
  }