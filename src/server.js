import express from 'express';
import router from './router';
import http from 'http';
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);

app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

export default server;
