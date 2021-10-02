const { configOptions } = require('./config');
const { MongoClient } = require('mongodb');
const globCallback = require('glob');

async function connectToDbServer() {
  const client = new MongoClient(configOptions.dbServerUrl);
  await client.connect();
  return client;
}

function getDb(client, domainName) {
  return client.db(getDatabaseName(domainName));
}

function getDatabaseName(domainName) {
  return `${configOptions.dbNameBase}-${domainName}-${configOptions.dbNameSuffix}`;
}

const glob = (pattern, options) =>
  new Promise((resolve, reject) => {
    globCallback(pattern, options, (err, matches) => {
      if (err) {
        reject(err);
      }

      resolve(matches);
    });
  });

async function getFiles(pattern) {
  return glob(pattern);
}

module.exports = {
  connectToDbServer,
  getDb,
  getFiles,
};
