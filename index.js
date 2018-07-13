import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import config from './src/config/config';
import logger from './src/logger/app.logger';

// Routes
import redisRouter from './src/routes/redis.router';

const port = config.serverPort;
logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev', {'stream': logger.stream}));

app.use('/redis', redisRouter);

app.get('/', (req, res) => {
  res.send('server runing');
});

app.listen(port, () => {
  logger.info('server started - '.port);
});
