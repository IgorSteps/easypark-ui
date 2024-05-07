export function createWebSocket() {
    const userId = sessionStorage.getItem('userId');
    const url = `${process.env.WS_API_URL}/ws/${userId}`;
    console.info('WebSocket url', url);
    const webSocket = new WebSocket(url);
   
    // Ensure that the WebSocket connection is opened before returning it
    webSocket.onopen = () => {
        console.log('WebSocket connection opened');
    };

    // Handle errors and log them
    webSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    // Handle connection closures and log them
    webSocket.onclose = (event) => {
        console.warn('WebSocket connection closed:', event);
    };
    
    const sendMessage = (receiverID, content) => {
        const message = {
            senderID: userId,
            receiverID: receiverID,
            content,
        };
        console.log('sent message', message)
        webSocket.send(JSON.stringify(message));
    };

    const subscribeToMessages = (callback) => {
        webSocket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                console.log('received raw message', message)
                callback(message);
            } catch (error) {
                console.error('Error parsing received message:', error);
                // TODO: How can we handle the error?
            }
        };
    };

    webSocket.onclose = function (evt) {
        console.warn("websocket connection closed.")
    };

    return { sendMessage, subscribeToMessages };
};

export default createWebSocket;