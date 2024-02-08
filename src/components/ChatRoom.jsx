import React, { useState, useEffect, useRef } from "react";

function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3005/connection");

    ws.current.onopen = () => {
      console.log("Connected to the chat server");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (ws.current) {
      const messageToSend = JSON.stringify({
        type: "message",
        data: { message: input },
      });
      ws.current.send(messageToSend);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write a message..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.data.message}</p>
        ))}
      </div>
    </div>
  );
}

export default ChatRoom;
