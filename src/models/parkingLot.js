import axios from 'axios';

export async function getAllParkingLots() {
    try {
      const response = await axios.get(process.env.BASE_API_URL+`/driver-parking-lots`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to get all parking lots', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Failed to receive response after making request to get all parking lots', error.request);
        throw new Error('an error occurred')
      } else {
        console.log('Failed to setup request', error.message);
        throw new Error('an error occurred')
      }
    }
  }