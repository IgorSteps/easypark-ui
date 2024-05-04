import axios from 'axios';

export async function getAllParkingLots() {
    try {
      console.log("Get all Parking lots token", sessionStorage.getItem('token'))
      const response = await axios.get(process.env.BASE_API_URL+`/driver-parking-lots`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Failed to get all parking lots", error.response)
      throw new Error(error.response.data.error || 'An error occurred');  }
  }