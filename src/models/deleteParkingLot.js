import axios from 'axios';

export async function deleteParkingLot(id) {
  try {
      const response = await axios.delete(process.env.BASE_API_URL+`/parking-lots/${id}`,{
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.debug("Got response data for deleting a parking lot", response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to delete parking lot', error.response);
        throw new Error(error.response.data || 'An error occurred')
    } else if(error.request){
        console.error("Didn't receive response after trying to delete parking lot", error.request);
        throw new Error('No healthy upstream');
    } else{
        console.error("Failed to set up request to delete parking lot", error.message);
        throw new Error("An error occurred");
    }
  }
}