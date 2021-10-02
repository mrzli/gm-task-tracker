const DB_HOST = 'localhost';
const DB_PORT = 27017;
const DB_NAME_BASE = 'task-tracker';
const DB_NAME_SUFFIX = 'dev';

const configOptions = {
  port: 4000,
  apiPrefix: '/api',
  dbHost: DB_HOST,
  dbPort: DB_PORT,
  dbServerUrl: `mongodb://${DB_HOST}:${DB_PORT}`,
  dbNameBase: DB_NAME_BASE,
  dbNameSuffix: DB_NAME_SUFFIX,
};

module.exports = { configOptions };
