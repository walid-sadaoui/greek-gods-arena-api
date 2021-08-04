import http from 'http';
import config from './config';
import Debug from 'debug';
import app from './index';

const debug = Debug('simple-rpg-game-api:server');
const PORT: number = parseInt(config.port);

const server = http.createServer(app);
server.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});
