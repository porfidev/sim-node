import Redis from 'ioredis';

class RedisController{
  constructor(host, port){
    this.redis = new Redis(port, host);
    this.pub = new Redis();
    this.channel = null;
  }

  subscribe(channel){
    this.redis.subscribe(channel, (error, count) => {
      this.channel = channel;
      console.log('Redis suscrito a: ' + channel);
    });
  }

  static publish(data){
    this.pub.publish(this.channel, data);
  }

  static publishWeb(req, res){
    RedisController.publish('desde web');
    res.send('enviado');
  }

  initializeEvents(){
    this.redis.on('message', (channel, message) => {
      console.log('mensaje recibido: ' + message);
    });
  }
}

export default RedisController;
