import logger from '../logger/app.logger';

class IOController{
  constructor(){
  }

  static hello(io, req, res) {
    io.sockets.emit('sending message', { for: 'everyone', date: 'redisRouter message' });

    logger.info('Emitting from socket');
    res.send('message send');
  }

  static ping(io, req, res) {
    io.sockets.emit('sending message', { for: 'everyone', date: 'PONG' });

    logger.info('Doing PONG');
    res.send('PONG');
  }

  static emitMessage(io, req, res){
    const type = req.body.type;
    const payload = req.body.payload;
    res.send(`Type: ${type}, Payload: ${payload}`);
  }
}

export default IOController;
