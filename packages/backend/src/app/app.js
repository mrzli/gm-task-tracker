const express = require('express');
const {
  initializeExampleController,
} = require('../domains/example/example-controller');

class App {
  constructor(cradle) {
    this._cradle = cradle;
  }

  async initialize() {
    const app = express();
    initializeExampleController(app, this._cradle);

    this._app = app;
  }

  async start() {
    if (!this._app) {
      throw new Error(
        'Need to initialize app before you can start the server.'
      );
    }

    const port = this._cradle.configOptions.port;
    await this._app.listen(port);
    console.log(`Server listening on port '${port}'`);
  }
}

module.exports = {
  App,
};
