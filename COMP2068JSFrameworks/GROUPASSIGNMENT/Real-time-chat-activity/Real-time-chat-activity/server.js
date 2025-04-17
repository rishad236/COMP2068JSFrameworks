const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "Public")));

let messageHistory = [];

io.on("connection", (socket) => {
  const username = "User_" + Math.floor(Math.random() * 1000);
  socket.username = username;

  socket.emit("init", { username, history: messageHistory });
  socket.broadcast.emit("user-joined", username);

  socket.on("chat-message", (msg) => {
    const fullMsg = {
      user: socket.username,
      text: msg
    };

    messageHistory.push(fullMsg);
    if (messageHistory.length > 10) messageHistory.shift();

    io.emit("chat-message", fullMsg);
  });

  socket.on("typing", (isTyping) => {
    socket.broadcast.emit("typing", {
      user: socket.username,
      isTyping
    });
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user-left", socket.username);
  });
});

http.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
