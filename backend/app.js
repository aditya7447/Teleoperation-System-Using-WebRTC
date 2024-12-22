const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const bcrypt = require("bcrypt");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const PORT = 5000;

app.use(express.json());
app.use(cors());

const users = [{ username: "admin", password: bcrypt.hashSync("password", 10) }];

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({ message: "Login successful" });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("signal", (data) => {
    socket.broadcast.emit("signal", data);
  });

  socket.on("control", (command) => {
    console.log("Command received:", command);
    io.emit("control", command);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});