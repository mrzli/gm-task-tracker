const express = require('express');

class AppWrapper {
  constructor({ configOptions, logger }) {
    this._configOptions = configOptions;
    this._logger = logger;
  }

  get app() {
    return this._app;
  }

  async initialize() {
    this._app = express();
  }

  async start() {
    if (!this._app) {
      throw new Error(
        'Need to initialize app before you can start the server.'
      );
    }

    const port = this._configOptions.port;
    await this._app.listen(port);
    this._logger.info(`Server listening on port '${port}'`);
  }
}

module.exports = {
  AppWrapper,
};
