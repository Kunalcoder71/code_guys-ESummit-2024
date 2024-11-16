const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const PORT = 5000;

// Connect to MongoDB
mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: "http://localhost:3000",
  
  credentials: true
}));
app.use(express.json());

let rooms = {}; // Stores data for each room, including code, video URL, and messages

// Endpoint to create a new room
app.post('/createRoom', (req, res) => {
  const roomKey = Math.random().toString(36).substring(2, 8);
  rooms[roomKey] = { code: '', videoUrl: '', messages: [] }; // Initialize room data
  res.json({ roomKey });
  console.log(`Room created: ${roomKey}`);
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected with socket ID: ${socket.id}`);

  // User joins a room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);

    if (rooms[roomId]) {
      // Send previous messages, code, and video URL to the new user
      socket.emit('previousMessages', rooms[roomId].messages);
      socket.emit('codeUpdated', rooms[roomId].code);
      socket.emit('videoUrl', rooms[roomId].videoUrl);
    } else {
      console.warn(`Room ${roomId} not found.`);
    }
  });


  
  socket.on('sendVideoUrl', (url, roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].videoUrl = url; // Save video URL in room
      io.to(roomId).emit('videoUrl', url); // Emit video URL to all users in the room
      console.log(`Video URL set for room ${roomId}: ${url}`);
    }
  });
  });

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
