import axios from 'axios';

export async function getAllParkingLots(requestBody) {
    try {
      const response = await axios.get(process.env.BASE_API_URL+`/parking-lots/`, requestBody, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to get all parking lots", error.response)
      throw new Error(error.response.data.error || 'An error occurred');  }
  }