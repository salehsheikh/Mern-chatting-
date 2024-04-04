import express from 'express';
import http from 'http'; // Change the import to use default export
import { Server as SocketIO } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import userRoutes from './Routes/userRoutes.js';
import chatRoutes from './Routes/chatRoutes.js';
import messageRoutes from './Routes/messageRoutes.js';
import { errorHandler, notFound } from './middleware/errorMidleware.js';

const app = express();
app.use(cors());
app.use(express.json());
connectDB();
dotenv.config();
app.get('/', (req, res) => {
  res.send("Api is running successfully");
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
// --------------------------deployment------------------------------

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

// --------------------------deployment------------------------------
app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app); // Create server using createServer method
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const io = new SocketIO(server, {
  pingTimeout: 6000,
  cors: {
    origin: 'http://localhost:5173'
  }
});

io.on('connection', (socket) => {
  console.log('Connected to Socket.IO');
  socket.on("setup",(userData)=>{
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });
  socket.on("join chat",(room)=>{
   socket.join(room);
   console.log("user joined room:"+room);

  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message",(newMessageReceived)=>{
    var chat=newMessageReceived.chat;
    if(!chat.users)return console.log("chat.users not defined");
    chat.users.forEach(user=>{
      if(user._id==newMessageReceived.sender._id)return;
      socket.in(user._id).emit("message recieved",newMessageReceived)
    })
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

