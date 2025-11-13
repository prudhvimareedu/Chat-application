import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

let stompClient = null;

function ChatRoom({ username }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = over(socket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/public', (msg) => {
        const message = JSON.parse(msg.body);
        setMessages((prev) => [...prev, message]);
      });
    });
  }, []);

  const sendMessage = () => {
    if (text.trim() !== '') {
      const msg = { sender: username, content: text, type: 'CHAT' };
      stompClient.send('/app/sendMessage', {}, JSON.stringify(msg));
      setText('');
    }
  };

  return (
    <div className="chat-room">
      <h2>Welcome, {username} 👋</h2>
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i}><b>{m.sender}:</b> {m.content}</div>
        ))}
      </div>
      <input
        type="text"
        value={text}
        placeholder="Type message..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default ChatRoom;
