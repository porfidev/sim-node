import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import SocketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
let io = new SocketIO(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, cache-control");
  next();
});

app.get('/', (req,res) => {
  res.send('express running');
});

app.get('/echo', (req,res) => {
  res.sendFile(__dirname + '/public/test.html');
});

server.listen(3000, function () {
  console.log('Express iniciado en puerto 3000')
});


const connections = [];

io.sockets.on('connection',(socket) => {
  connections.push(socket);
  console.log(' %s sockets is connected', connections.length);

  socket.on('disconnect', (socket) => {
    console.log(' %s sockets is disconnected', connections.length);
    connections.splice(connections.indexOf(socket), 1);
  });

  socket.on('sending message', (message) => {
    console.log('Message is received :', message);
    io.sockets.emit('new message', {message: message});
  });
});

/** Broadcast **/
// window.io = require('socket.io-client');
//
// window.Echo = new Echo({
//   broadcaster: 'socket.io',
//   host: window.location.hostname + ':6001'
// });
// /** === **/

