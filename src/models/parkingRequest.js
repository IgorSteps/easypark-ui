import axios from 'axios';

export async function createParkingRequest(requestBody) {
  console.debug("create parking request request body", requestBody)
    try {
      const response = await axios.post(process.env.BASE_API_URL+`/drivers/${sessionStorage.getItem('userId')}/parking-requests`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log("response create parking req", response.data)
      return response.data;
    } catch (error) {
      console.error("Failed to create parking request", error.response)
      throw new Error(error.response.data || 'An error occurred');  }
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
  