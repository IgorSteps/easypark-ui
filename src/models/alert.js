import axios from 'axios';

export async function getAlert() {
    try {
        const response = await axios.get(process.env.BASE_API_URL+`/alerts`, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });
        console.log(response)
      return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Failed to get alert', error.response);
            throw new Error(error.response.data || 'an error occurred')
        } else if (error.request) {
            console.error('Didnt receive response after making request get alert', error.request);
            throw new Error('an error occurred')
        } else {
            console.log('Failed to setup request to get alert', error.message);
            throw new Error('an error occurred')
        }
    }
}
