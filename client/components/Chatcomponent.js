import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Styles from '../style/chatcomponent.module.css'

const socket = io('http://localhost:5000', {
  reconnectionAttempts: 5,
  timeout: 5000,
});

const ChatComponent = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server with socket ID:', socket.id);
      socket.emit('joinRoom', roomId);
    });

    socket.on('previousMessages', (msgs) => {
      console.log('Previous messages received:', msgs);
      setMessages(msgs);
    });

    socket.on('receiveMessage', (data) => {
      console.log('Received message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    return () => {
      socket.off('connect');
      socket.off('previousMessages');
      socket.off('receiveMessage');
      socket.off('connect_error');
    };
  }, [roomId]);

  const sendMessage = () => {
    if (input.trim()) {
      console.log('Sending message:', input);
      socket.emit('sendMessage', input, roomId);
      setInput('');
    }
  };

  return (
    <div className={Styles.main}>
      <div className={Styles.chat_chats} >
        {messages.map((msg, index) => (
          <p className={Styles.chat_msg} key={index}>
            <strong>{msg.username}: </strong> {msg.message}
          </p>
        ))}
      </div>
      <div className={Styles.chat_msgset}>
        <input
        className={Styles.chat_input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button  className={Styles.chat_btn} onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;