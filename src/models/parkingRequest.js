import axios from 'axios';

export async function createParkingRequest(requestBody) {
  try {
      if (requestBody.destinationLotID === '' || requestBody.destinationLotID === undefined) {
        console.warn("got empty ID or name for destination parking lot")
        return new Error('Please choose destination')
      }
      const response = await axios.post(process.env.BASE_API_URL+`/drivers/${sessionStorage.getItem('userId')}/parking-requests`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to create a parking request', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Failed to receive response after making request to create a parking request', error.request);
        throw new Error('an error occurred')
      } else {
        console.log('Failed to setup request', error.message);
        throw new Error('an error occurred')
      }
    }
  }

export async function getAllParkingRequests() {
    try {
      const response = await axios.get(process.env.BASE_API_URL+`/drivers/${sessionStorage.getItem('userId')}/parking-requests`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to get all parking requests for driver', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Failed to receive response after making request to get all parking requests', error.request);
        throw new Error('an error occurred')
      } else {
        console.log('Failed to setup request', error.message);
        throw new Error('an error occurred')
      }
    }
  }
  