const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on('newUser', (name) => {
    io.emit('newUser', name)
  })
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on port:${port}`);
});
