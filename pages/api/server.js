// server.js

const { PeerServer } = require("peer");
const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 5000;
const peerServer = PeerServer({ port: 9000, path: "/peerjs" });

app.prepare().then(() => {
  const server = express();

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const io = require("socket.io")(server.listen(PORT), {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("join-room", (roomId, userId) => {
      socket.join(roomId);
      socket.to(roomId).broadcast.emit("user-connected", userId);

      socket.on("disconnect", () => {
        socket.to(roomId).broadcast.emit("user-disconnected", userId);
      });
    });

    socket.on("send-message", (roomId, userId, message) => {
      socket.to(roomId).broadcast.emit("message-received", userId, message);
    });
  });
});
