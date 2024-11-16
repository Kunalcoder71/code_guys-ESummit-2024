// src/socketService.js

import { io } from 'socket.io-client';

// Replace with your server's URL
const SOCKET_SERVER_URL = 'http://localhost:5000';

const socket = io(SOCKET_SERVER_URL, {
  withCredentials: true, // This allows cookies to be sent with the request
  transports: ['websocket'], // You can specify transport options if needed
});

// Export the socket for use in other components
export default socket;
