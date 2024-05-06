import axios from 'axios';

export async function getSingleParkingSpace(parkingSpaceID) {
    try {
        if (parkingSpaceID === '' || parkingSpaceID === undefined ){
            console.warn("received empty or undefined parking space id")
            throw new Error("An error ocurred")
        }
        const response = await axios.get(process.env.BASE_API_URL+'/driver/parking-spaces/'+parkingSpaceID, {
            headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

      return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Failed to get single parking space', error.response);
            throw new Error(error.response.data || 'an error occurred')
        } else if (error.request) {
            console.error('Didnt receive response after making request get single parking space', error.request);
            throw new Error('an error occurred')
        } else {
            console.error('Failed to setup request to get single parking space', error.message);
            throw new Error('an error occurred')
        }
    }
  }