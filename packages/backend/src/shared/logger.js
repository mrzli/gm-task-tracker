/* eslint-disable no-console */
class Logger {
  constructor() {}

  error(message, ...optionalParams) {
    console.error(message, ...optionalParams);
  }

  warn(message, ...optionalParams) {
    console.warn(message, ...optionalParams);
  }

  info(message, ...optionalParams) {
    console.info(message, ...optionalParams);
  }

  debug(message, ...optionalParams) {
    console.debug(message, ...optionalParams);
  }

  trace(message, ...optionalParams) {
    console.trace(message, ...optionalParams);
  }
}

module.exports = {
  Logger,
};
