import axios from 'axios';

export async function deleteParkingLot(chosenLot) {
  try {
      if (chosenLot.chosenLotID === '' || chosenLot.chosenLotID === undefined) {
        console.warn("got empty ID or name for destination parking lot")
        throw new Error('Please choose destination')
      }
      const response = await axios.delete(process.env.BASE_API_URL+`/parking-lots/${chosenLot.chosenLotID}`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.debug("Got response data for deleting a parking lot", response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to delete parking lot', error.response);
        throw new Error(error.response.data || 'An error occurred')
    }
  }
}