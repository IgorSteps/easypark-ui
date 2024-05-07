import React, { createContext, useContext, useState, useEffect } from 'react';
import { createWebSocket } from '../models/messagingService.js';

const WebSocketContext = createContext();

export const useWebSocket = () => useContext(WebSocketContext);

export default function WebSocketProvider({ children }) {
    const [messages, setMessages] = useState([]);
    const [webSocketAPI, setWebSocketAPI] = useState({ sendMessage: () => {}, subscribeToMessages: () => {} });

    useEffect(() => {
        const { sendMessage, subscribeToMessages } = createWebSocket();

        // Setup the message subscription
        const messageSubscription = subscribeToMessages((message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Set the WebSocket API
        setWebSocketAPI({ sendMessage, messages });

        return () => {
            // Clean up WebSocket and any listeners when the component unmounts
            messageSubscription();  // Assuming your subscribeToMessages returns a function to unsubscribe
        };
    }, []);

    // Update the context value only when messages or sendMessage changes
    const value = {
        sendMessage: webSocketAPI.sendMessage,
        messages
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};