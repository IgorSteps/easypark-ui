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
        throw new Error('no healthy upstream')
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
      if (error.response) {
        console.error("Failed to get all driver's parking requests", error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error("Didn't receive response after making request get all driver's parking requests", error.request);
        throw new Error('no healthy upstream')
      } else {
        console.log("Failed to setup request to get all driver's parking requests", error.message);
        throw new Error('an error occurred')
      }
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
      if (error.response) {
        console.error('Failed to get all parking requests', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Didnt receive response after making request get all parking requests', error.request);
        throw new Error('no healthy upstream')
      } else {
        console.log('Failed to setup request to get all parking requests', error.message);
        throw new Error('an error occurred')
      }
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
      if (error.response) {
        console.error('Failed to automatically assign parking space', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Didnt receive response after making request to automatically assign parking space', error.request);
        throw new Error('no healthy upstream')
      } else {
        console.log('Failed to setup request to automatically assign a space space', error.message);
        throw new Error('an error occurred')
      }
    }
  }

  export async function deassignParkingSpace(parkingRequestID) {
    const request = {
      "parkingSpaceID": null
    }
    try {
      const response = await axios.patch(process.env.BASE_API_URL+`/parking-requests/`+parkingRequestID+'/space', request, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to de-assign parking space', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Didnt receive response after making request de-assign parking space', error.request);
        throw new Error('no healthy upstream')
      } else {
        console.log('Failed to setup request to de-assign space', error.message);
        throw new Error('an error occurred')
      }
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
      if (error.response) {
        console.error('Failed to update parking request', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Didnt receive response after making request to update parking request', error.request);
        throw new Error('no healthy upstream')
      } else {
        console.log('Failed to setup request to update parking request notification', error.message);
        throw new Error('an error occurred')
      }
    }
  }