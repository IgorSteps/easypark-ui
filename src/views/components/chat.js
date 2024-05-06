import React from "react";
import ChatWindow from "./chat/chatWindow.js"
import useMessageController from "../../controllers/useMessageService.js";

function Chat() {
    const { messages, handleSendMessage } = useMessageController();

    return (
        <ChatWindow messages={messages} onSendMessage={handleSendMessage} />
    )
}

export default Chat;