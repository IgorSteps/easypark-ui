import axios from 'axios';

export async function createParkingLot(parkingLotDetails) {
  console.log(parkingLotDetails);
  try {
    let token = sessionStorage.getItem('token')
    console.debug("backend api endpoint is set to ", process.env.BASE_API_URL)
    const response = await axios.post(process.env.BASE_API_URL+'/parking-lots', parkingLotDetails, {
        headers:{
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    });
    console.log(response);
    console.debug("Got response data for creating a parking lot", response.data)
    return response.data;
  } catch (error) {
    console.error('Failed to create parking lot', error.response);
    throw new Error(error.response.data || 'An error occurred');
  }
}