import server from './src/server';
import RedisController from './src/controller/redis';

const redis = new RedisController('localhost', '6379');

redis.subscribe('surtidos');
redis.initializeEvents();

server.listen(3000, function() {
  console.log('Listening on port 3000...')
});
