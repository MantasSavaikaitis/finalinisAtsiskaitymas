import { Socket } from "socket.io";
import { IncomingMessage, ServerResponse } from 'http';
import communications from "./comms";
import { Task } from './schemasAndTypes'

const http = require('http');
const io = require('socket.io');

const HttpServer = http.createServer();

const onlineUsers: string[] = [];

const socketIo = io(HttpServer, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ["GET", "POST"]
  }
});

socketIo.on('connection', (socket: Socket) => {
  console.log('a user connected', socket.id);

  socket.on('comms', async (task: Task) => await communications(task, socket, onlineUsers))

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 3000;
HttpServer.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});