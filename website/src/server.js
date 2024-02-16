const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for 'chat message' events from clients
  socket.on('chat message', (message) => {
    console.log('message: ', message);

    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
