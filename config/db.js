const util = require('util');
const mongoose = require('mongoose');
const debug = require('debug')('cinemas_network_platform_api:mongoose');
const logger = require('../app/libs/logger')(module);

mongoose.Promise = require('bluebird');

const dbUrl = `${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
const connection = mongoose.connection;
mongoose.connect(dbUrl);

connection.on('connected', () => {
  logger.info(`Mongoose connected to ${dbUrl}`);
});

connection.on('disconnected', () => {
  logger.info(`Mongoose disconnected from ${dbUrl}`);
});

connection.on('error', (err) => {
  if (err instanceof Error) throw err;
  throw new Error(`Unable connect to database: ${dbUrl}`);
});

if (process.env.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

process.on('SIGNINT', () => {
  connection.close(() => {
    logger.info(`Mongoose connection closed through app termination`);
    process.exit(0);
  });
});
