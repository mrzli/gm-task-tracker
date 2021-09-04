const express = require('express');
const {
  initializeExampleController,
} = require('../domains/example/example-controller');
const { initializeAuthController } = require('../domains/auth/auth-controller');

class AppWrapper {
  constructor({ configOptions }) {
    this._configOptions = configOptions;
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
    console.log(`Server listening on port '${port}'`);
  }
}

module.exports = {
  AppWrapper,
};
