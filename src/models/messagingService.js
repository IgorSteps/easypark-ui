export function createWebSocket() {
    const userId = sessionStorage.getItem('userId');
    const url = `${process.env.WS_API_URL}/ws/${userId}`;
    console.info(url);
    const webSocket = new WebSocket(url);

    const sendMessage = (receiverID, content) => {
        const message = {
            senderID: userId,
            receiverID: receiverID,
            content,
        };
        webSocket.send(JSON.stringify(message));
    };

    const subscribeToMessages = (callback) => {
        webSocket.onmessage = (event) => {
            try {
                const message = event.data;
                callback(message);
            } catch (error) {
                console.error('Error parsing received message:', error);
                // TODO: How can we handle the error?
            }
        };
    };

    return { sendMessage, subscribeToMessages };
};

export default createWebSocket;