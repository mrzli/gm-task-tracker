const { StatusCodes, ReasonPhrases } = require('http-status-codes');

class ServerError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

class UnauthorizedError extends ServerError {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
  }
}

class ItemNotFoundError extends ServerError {
  constructor(type) {
    super(StatusCodes.BAD_REQUEST, 'ItemNotFound');
    this.type = type;
  }
}

module.exports = {
  ServerError,
  UnauthorizedError,
  ItemNotFoundError,
};
