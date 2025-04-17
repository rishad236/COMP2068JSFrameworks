const socket = io();

let username = "";

const messages = document.getElementById("messages");
const typing = document.getElementById("typing");
const form = document.getElementById("chat-form");
const input = document.getElementById("msg-input");

socket.on("init", (data) => {
  username = data.username;
  data.history.forEach(displayMsg);
});

socket.on("chat-message", displayMsg);

socket.on("typing", (data) => {
  typing.innerText = data.isTyping ? `${data.user} is typing...` : "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim()) {
    socket.emit("chat-message", input.value);
    socket.emit("typing", false);
    input.value = "";
  }
});

input.addEventListener("input", () => {
  socket.emit("typing", true);
});

function displayMsg(msg) {
  const li = document.createElement("li");
  li.textContent = `${msg.user}: ${msg.text}`;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight;
}
