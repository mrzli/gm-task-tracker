const DB_HOST = 'localhost';
const DB_PORT = 27017;
const DB_NAME = 'task-tracker-dev';

const envVars = {
  PORT: 4000,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_SERVER_URL: `mongodb://${DB_HOST}:${DB_PORT}`,
};

module.exports = { envVars };
