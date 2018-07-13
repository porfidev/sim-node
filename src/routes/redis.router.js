import express from "express";
import Redis from 'ioredis';
import config from '../config/config';
import RedisController from '../controller/redis.controller';
const router = express.Router();

const redis = new Redis(config.redisPort, config.redisHost);
const pub = new Redis(config.redisPort, config.redisHost);

redis.subscribe('test-channel', function(err, count) {
  console.log('redisRouter suscrito');
});

redis.on('message', function(channel, message) {
  console.log('Message Recieved: ' + message);
});

router.get('/ping', (req, res) => {
  RedisController.ping(req, res);
});

router.get('/hello', (req, res) => {
  RedisController.hello(pub, req, res);
});

export default router;
