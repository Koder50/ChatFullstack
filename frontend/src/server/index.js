const { Server } = require("socket.io");
const http = require("http");

// jeśli masz już serwer HTTP
const server = http.createServer();

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080", // frontend Angular
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Otrzymano:", msg);
    io.emit("reply", "Serwer mówi: " + msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// uruchamiamy na porcie 3000
server.listen(3000, () => {
  console.log("🚀 Socket.io server running on http://localhost:3000");
});