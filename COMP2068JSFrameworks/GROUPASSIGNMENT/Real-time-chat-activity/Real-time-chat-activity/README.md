# 🧑‍🏫 In-Class Activity – Username Color Toggle

## 🎯 Objective

Add a button that allows users to change their username color. This will help you understand how events flow between the browser and the server in real-time.

---

## 🧪 Your Challenge

1. When a user clicks the **"Change My Color"** button:
    - Emit a custom `change-color` event to the server
    - Server assigns a new random color and sends it back
    - Client updates their `userColor` and future messages appear in the new color

---

## 🔧 Instructions

### 1. `index.html`
- Use the button that already exists with id `colorBtn`

### 2. `script.js`
- Add an event listener to emit `change-color`
- Listen for a `color-updated` event from the server and update a `userColor` variable
- When sending messages, apply that color (you may need to modify `displayMsg()`)

### 3. `server.js`
- On receiving `change-color`, generate a new color
- Send it back to the same user with `socket.emit('color-updated', newColor)`

---

## ✅ You’re Done When:
- Messages from the same user appear in different colors **after clicking the button**
- All other functionality remains working (chat, typing)

---

Good luck! 🎉
