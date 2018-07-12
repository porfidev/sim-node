import SocketIO from 'socket.io';

class IOController{
  constructor(server){
    this.io = new SocketIO(server);
    this.connections = [];
  }

  initializeEvents(){
    this.io.sockets.on('connection',(socket) => {
      this.connections.push(socket);
      console.log(' %s sockets is connected', this.connections.length);

      socket.on('disconnect', (socket) => {
        console.log(' %s sockets is disconnected', this.connections.length);
        this.connections.splice(this.connections.indexOf(socket), 1);
      });

      socket.on('sending message', (message) => {
        console.log('Message is received :', message);
        io.sockets.emit('new message', {message: message});
      });
    });
  }
}

export default IOController;
