// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { createWebSocket } from '../models/messagingService.js';

// const WebSocketContext = createContext();

// export const useWebSocket = () => useContext(WebSocketContext);

// export default function WebSocketProvider({ children }) {
//     const [messages, setMessages] = useState([]);
//     const [webSocketAPI, setWebSocketAPI] = useState({ sendMessage: () => {}, subscribeToMessages: () => {} });

//     useEffect(() => {
//         const { sendMessage, subscribeToMessages } = createWebSocket();

//         // Setup the message subscription
//         const messageSubscription = subscribeToMessages((message) => {
//             setMessages(prevMessages => [...prevMessages, message]);
//         });

//         // Set the WebSocket API
//         setWebSocketAPI({ sendMessage, messages });

//         return () => {
//             // Clean up WebSocket and any listeners when the component unmounts
//             messageSubscription();  // Assuming your subscribeToMessages returns a function to unsubscribe
//         };
//     }, []);

//     // Update the context value only when messages or sendMessage changes
//     const value = {
//         sendMessage: webSocketAPI.sendMessage,
//         messages
//     };

//     return (
//         <WebSocketContext.Provider value={value}>
//             {children}
//         </WebSocketContext.Provider>
//     );
// };

// import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
// import useWebSocket from 'react-use-websocket';

// const WebSocketContext = createContext(null);

// export const useWebSocketContext = () => useContext(WebSocketContext);

// export default function WebSocketProvider({ children }) {
//     const userId = sessionStorage.getItem('userId');
//     const url = `${process.env.WS_API_URL}/ws/${userId}`;
//     const [messages, setMessages] = useState([]);
    
//     const socket = useWebSocket(url, {
//         onOpen: () => console.log('WebSocket connection opened'),
//         onClose: () => console.log('WebSocket connection closed'),
//         onError: error => console.error('WebSocket error:', error),
//         onMessage: event => {
//             try {
//                 const message = JSON.parse(event.data);
//                 setMessages(prev => [...prev, message]);
//             } catch (error) {
//                 console.error('Error parsing received message:', error);
//             }
//         }
//     });

//     const sendMessage = useMemo(() => {
//         return (receiverID, content) => {
//             if (socket.readyState === WebSocket.OPEN) {
//                 const message = {
//                     senderID: userId,
//                     receiverID,
//                     content,
//                 };
//                 socket.send(JSON.stringify(message));
//             }
//         };
//     }, [socket, userId]);

//     // Update the context value only when messages change
//     const value = useMemo(() => ({ sendMessage, messages }), [sendMessage, messages]);

//     return (
//         <WebSocketContext.Provider value={value}>
//             {children}
//         </WebSocketContext.Provider>
//     );
// }
