import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import morgan from 'morgan';
import config from './src/config/config';
import logger from './src/logger/app.logger';
import SocketIO from 'socket.io';

// Routes
import redisRouter from './src/routes/redis.router';
import ioRouter from './src/routes/io.router';


const port = config.serverPort;
logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};

const app = express();
const server = http.createServer(app);
let io = new SocketIO(server);
const ioInstance = ioRouter(io);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev', {'stream': logger.stream}));

app.use('/redis', redisRouter);
app.use('/socket', ioInstance);

app.get('/', (req, res) => {
  res.send('server runing');
});

app.listen(port, () => {
  logger.info('server started - '.port);
});
