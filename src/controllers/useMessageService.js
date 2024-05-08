import { useState, useEffect } from 'react';
import { createWebSocket } from '../models/messagingService.js';

export function useMessageController() {
  const [messages, setMessages] = useState([]);
  const { sendMessage, subscribeToMessages } = createWebSocket();

  useEffect(() => {
    subscribeToMessages((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleSendMessage = (receiverID, content) => {
    sendMessage(receiverID, content);
  };

  return { messages, handleSendMessage };
};

export default useMessageController;
