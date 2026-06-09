// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.io server
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins (React dev server)
    methods: ["GET", "POST"]
  }
});

// When a user connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Listen for messages from client
  socket.on("send_message", (data) => {
    console.log("Message received:", data);

    // Send message to all clients
    io.emit("receive_message", data);
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(3001, () => {
  console.log("Socket.io server running on port 3001");
});
