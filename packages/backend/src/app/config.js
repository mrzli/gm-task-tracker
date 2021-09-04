const { DOMAIN_NAME_LIST } = require('../domains/_shared/domain-name');
const DB_HOST = 'localhost';
const DB_PORT = 27017;
const DB_NAME_BASE = 'task-tracker';
const DB_NAME_SUFFIX = 'dev';

const domainDbNamesConfig = DOMAIN_NAME_LIST.reduce(
  (acc, domainName) => ({
    ...acc,
    [domainName]: `${DB_NAME_BASE}-${domainName}-${DB_NAME_SUFFIX}`,
  }),
  {}
);

const configOptions = {
  port: 4000,
  apiPrefix: '/api',
  dbHost: DB_HOST,
  dbPort: DB_PORT,
  dbServerUrl: `mongodb://${DB_HOST}:${DB_PORT}`,
  domainDbNamesConfig,
};

module.exports = { configOptions };
