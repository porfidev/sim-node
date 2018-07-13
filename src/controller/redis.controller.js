import logger from '../logger/app.logger';

class RedisController {
  constructor() {
  }

  static hello(pub, req, res) {
    pub.publish('test-channel', 'hello world');
    res.send('message send');
  }

  static ping(req, res) {
    logger.info('Doing PONG');
    res.send('PONG');
  }
}

export default RedisController;
