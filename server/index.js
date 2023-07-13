// import dotenv from 'dotenv'
// dotenv.config()
import "dotenv/config.js";
import express from 'express';
import sequelize from './db.js';
import { User, Cargo, Transport } from "./models/models.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';
import router from "./routes/index.js";
import errorMessage from "./middleware/ErrorHandlingMiddleware.js";
import path from 'path';
import { fileURLToPath } from 'url';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5000;
const SOCKET_PORT = process.env.SOCKET_PORT || 5030;

const app = express();
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser());


app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.static(path.resolve(__dirname, 'static', 'avatars')))
app.use(fileUpload({}));
app.use('/api', router)

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
  }
});

let onlineUsers = [];

io.on("connection", (socket) => {

  console.log(` ${socket.id} connected`);
  socket.on('login', (userId) => {
    if (!onlineUsers.some(user => user.userId === userId)) {
      onlineUsers.push({ userId: userId, socketId: socket.id })
    }
    console.log(userId, "socket.userID");
    io.emit('onlineUsers', onlineUsers)
  })

  socket.on('response', (message) => {
    socket.join(message.dialogId)
    io.to(message.dialogId).emit('response', message);
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit('onlineUsers', onlineUsers)
    console.log(` ${socket.id} disconnected`);
  })
});

httpServer.listen(SOCKET_PORT);

app.set('socketio', io);

app.use(errorMessage)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log("server working"))
  } catch (e) {
    console.log(e)
  }
}
start()