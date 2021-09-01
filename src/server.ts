import http from 'http';
import mongoose from 'mongoose';
import config from './config';
import Debug from 'debug';
import app from './index';

const debug = Debug('greek-gods-arena-api:server');
const PORT: number = parseInt(config.port);

if (config.databaseUrl) {
  mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection Error'));
  db.once('open', () => {
    debug('Connected to MongoDb');
  });
} else {
  debug(`Mongoose : Database url not specified`);
}
const server = http.createServer(app);
server.listen(PORT, () => {
  debug(`Listening on port ${PORT}`);
});
