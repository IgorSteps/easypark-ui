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
      console.error('Didnt receive response after making request get all parking lots', error.request);
      throw new Error('an error occurred')
    } else {
      console.log('Failed to setup request to get all parking lots', error.message);
      throw new Error('an error occurred')
    }
  }
}

export async function getSingleParkingLot(id) {
  try {
    const response = await axios.get(process.env.BASE_API_URL+`/parking-lots/${id}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Failed to get single parking lot', error.response);
      throw new Error(error.response.data || 'an error occurred')
    } else if (error.request) {
      console.error('Didnt receive response after making request get single parking lot', error.request);
      throw new Error('an error occurred')
    } else {
      console.log('Failed to setup request to get single parking lot', error.message);
      throw new Error('an error occurred')
    }
  }
}