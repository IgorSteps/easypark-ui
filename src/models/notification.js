import axios from 'axios';

export async function createNotification(requestBody) {
    try {
        const response = await axios.post(process.env.BASE_API_URL+'/drivers/'+sessionStorage.getItem('userId')+'/notifications', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

      return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Failed to create notification', error.response);
            throw new Error(error.response.data || 'an error occurred')
        } else if (error.request) {
            console.error('Didnt receive response after making request create notification', error.request);
            throw new Error('an error occurred')
        } else {
            console.log('Failed to setup request to create notification', error.message);
            throw new Error('an error occurred')
        }
    }
}

export async function getAllNotifications() {
    try {
        const response = await axios.get(process.env.BASE_API_URL+`/notifications`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
      return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Failed to get notifications', error.response);
            throw new Error(error.response.data || 'an error occurred')
        } else if (error.request) {
            console.error("Didn't receive response after making request get notifications", error.request);
            throw new Error('no healthy upstream')
        } else {
            console.log('Failed to setup request to get notifications', error.message);
            throw new Error('an error occurred')
        }
    }
}