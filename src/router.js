import express from 'express';
const router = express.Router();
import RedisController from './controller/redis';

router.get('/', (req, res) => {
  res.send('sim-node server');
});

router.get('/publish', RedisController.publishWeb);

export default router;
