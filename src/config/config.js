import path from "path";
import * as appRoot from 'app-root-path';
import * as parameters from '../../parameters.json';

const root = path.dirname(require.main.filename || process.mainModule.filename);
let config = {};

console.log(parameters, 'parametros');

config.logFileDir = path.join(root, parameters.log_dir);
config.logFileName =  path.join(root, parameters.log_name);
config.serverPort = parameters.port || 3000;
config.redisPort = parameters.redis_port;
config.redisHost = parameters.redis_host;

export default config;
