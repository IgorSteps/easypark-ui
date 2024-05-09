import axios from 'axios';

export async function createParkingRequest(requestBody) {
  try {
      if (requestBody.destinationLotID === '' || requestBody.destinationLotID === undefined) {
        console.warn("got empty ID or name for destination parking lot")
        throw new Error('Please choose destination')
      }

      const response = await axios.post(process.env.BASE_API_URL+`/drivers/${sessionStorage.getItem('userId')}/parking-requests`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to create a parking request', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Didnt receive response after making request create parking request', error.request);
        throw new Error('an error occurred')
      } else {
        console.error('Failed to setup request to create a parking request', error.message);
        throw error
      }
    }
  }

export async function getAllDriversParkingRequests() {
    try {
      const response = await axios.get(process.env.BASE_API_URL+`/drivers/${sessionStorage.getItem('userId')}/parking-requests`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to get all parking requests for driver', error);
      throw new Error(error.response.data || 'An error occurred')
    }
  }
  
  export async function getAllParkingRequests() {
    try {
      const response = await axios.get(process.env.BASE_API_URL+`/parking-requests`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      console.error('Failed to get all parking requests', error);
      throw new Error(error.response.data || 'An error occurred')
    }
  }

  export async function automaticallyAssignParkingSpace(request) {
    try {
      const response = await axios.patch(process.env.BASE_API_URL+`/parking-requests/`+request.parkingRequestID+'/automatic/space', request, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to automatically assign a space to parking request', error);
      throw new Error(error.response.data || 'An error occurred')
    }
  }

  export async function deassignParkingSpace(parkingRequestID) {
    try {
      request = {
        "parkingSpaceID": null
      }
      const response = await axios.patch(process.env.BASE_API_URL+`/parking-requests/`+parkingRequestID+'/space', request, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to de-assign a parking space from parking request', error);
      throw new Error(error.response.data || 'An error occurred')
    }
  }

  export async function updateParkingRequestStatus(parkingReqID, request) {
    try {
      const response = await axios.patch(process.env.BASE_API_URL+`/parking-requests/`+parkingReqID+'/status', request, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update parking request status', error);
      throw new Error(error.response.data || 'An error occurred')
    }
  }