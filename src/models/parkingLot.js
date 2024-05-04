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
      console.error("Failed to get all parking lots", error.response)
      throw new Error(error.response.data || 'An error occurred');  }
  }