const { configOptions } = require('./config');

function getDatabaseName(domainName) {
  return `${configOptions.dbNameBase}-${domainName}-${configOptions.dbNameSuffix}`;
}

module.exports = {
  getDatabaseName,
};
