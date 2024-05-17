import axios from 'axios';

export async function updateParkingSpaceStatus(parkingSpaceID, status) {
    try {
        console.debug(`parkingSpaceID = ${parkingSpaceID}, status = ${status}`);

        const response = await axios.patch(`${process.env.BASE_API_URL}/parking-spaces/${parkingSpaceID}/status`, {
            status: status
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        });

        console.debug("Got response data for updating parking space status", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Failed to update parking space status', error.response);
            throw new Error(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            console.error("Didn't receive response after trying to update parking space status", error.request);
            throw new Error('An error occurred');
        } else {
            console.error("Failed to set up request to update parking space status", error.message);
            throw new Error("An error occurred");
        }
    }
}