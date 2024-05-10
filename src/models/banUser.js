import axios from 'axios';

export async function banUser(banID) {
  try {
      if (banID.id === '' || banID.id === undefined) {
        console.warn("got empty ID or name for destination parking lot")
        throw new Error('Please choose a valid user')
      }
      const response = await axios.patch(process.env.BASE_API_URL+`/drivers/${banID.id}/status`,banID,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.debug("Got response data for banning a user", response.data)
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to ban user', error.response);
        throw new Error(error.response.data || 'An error occurred')
    } else if(error.request){
        console.error("didn't receive response after trying to ban user", error.request);
        throw new Error('No healthy upstream');
    } else{
        console.error("Failed to set up request to ban user", error.message);
        throw new Error("An error occured");
    }
  }
}