const { MongoClient } = require('mongodb');

class DbProvider {
  constructor(configOptions, domainName) {
    this._configOptions = configOptions;
    this._domainName = domainName;
  }

  async connect() {
    const client = new MongoClient(this._configOptions.dbServerUrl);
    await client.connect();
    const dbName = this._configOptions.domainDbNamesConfig[this._domainName];
    this._db = client.db(dbName);
  }

  get db() {
    return this._db;
  }
}

module.exports = {
  DbProvider,
};
