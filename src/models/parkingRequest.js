import axios from 'axios';

export async function createParkingRequest(requestBody) {
  try {
      if (requestBody.destinationLotID === '' || requestBody.destinationLotID === undefined) {
        console.warn("got empty ID or name for destination parking lot")
        throw new Error('Please choose destination')
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
        console.error('Didnt receive response after making request create parking request', error.request);
        throw new Error('an error occurred')
      } else {
        console.error('Failed to setup request to create a parking request', error.message);
        throw error
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
      console.log("response get drivers parking req", response.data)
      return response.data;
    } catch (error) {
      console.error('Failed to get all parking requests for driver', error);
      throw new Error(error.response.data || 'An error occurred')
    }
  }
  