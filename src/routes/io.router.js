import express from 'express';
import IOController from '../controller/io.controller';

const router = express.Router();

export default function routerM(io) {
  router.get('/ping', (req, res) => {
    IOController.ping(io, req, res);
  });

  router.get('/hello', (req, res) => {
    IOController.hello(io, req, res);
  });

  const connections = [];

  io.sockets.on('connection', (socket) => {
    connections.push(socket);
    console.log(' %s sockets is connected', connections.length);

    socket.on('disconnect', (socket) => {
      console.log(' %s sockets is disconnected', connections.length);
      connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('sending message', (message) => {
      console.log('Message is received :', message);
      io.emit('new message', {message: message});
    });
  });

  return router;
};
