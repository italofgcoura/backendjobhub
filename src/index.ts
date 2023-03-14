
// import http from 'http';
import app from './app';
// const server = http.createServer(app);

import http from 'node:http';
import { Server } from 'socket.io';
const port = 3001;

const server = http.createServer(app);

export const io = new Server(server);

io.on('connect', () => {
  console.log('CONECTOU');
});

server.listen(port || 3001, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});



