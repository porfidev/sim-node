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
}

export default IOController;
