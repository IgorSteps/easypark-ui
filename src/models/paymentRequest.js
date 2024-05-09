import axios from 'axios';

export async function createPaymentRequest(requestBody) {
  try {
      const response = await axios.post(process.env.BASE_API_URL+`/drivers/${sessionStorage.getItem('userId')}/payments`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Failed to create a payment', error.response);
        throw new Error(error.response.data || 'an error occurred')
      } else if (error.request) {
        console.error('Didnt receive response after making request create payment', error.request);
        throw new Error('an error occurred')
      } else {
        console.error('Failed to setup request to create a payment', error.message);
        throw error
      }
    }
  }