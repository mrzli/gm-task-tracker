const { ENDPOINT_AUTH_TYPE_ENUM } = require('../../shared/endpoint-auth-type');
const { AUTH_COOKIE_NAME } = require('./constants');
const { UnauthorizedError } = require('../../shared/errors');

function createAuthMiddleware(type, userService) {
  switch (type) {
    case ENDPOINT_AUTH_TYPE_ENUM.public:
      return undefined;
    case ENDPOINT_AUTH_TYPE_ENUM.anyUser:
      return anyUserMiddleware;
    case ENDPOINT_AUTH_TYPE_ENUM.permission:
      // TODO GM: update when there are permissions in the system ()
      return anyUserMiddleware;
    default:
      throw new Error(`Invalid endpoint auth type: '${type}'`);
  }

  async function anyUserMiddleware(req, res, next) {
    const authToken = getAuthToken(req);
    if (!authToken) {
      next(new UnauthorizedError());
      return;
    }

    const user = await userService.getUserByToken(authToken);
    if (!user) {
      next(new UnauthorizedError());
      return;
    }

    setUserToRequest(req, user);

    next();
  }
}

function getAuthToken(req) {
  return req.cookies[AUTH_COOKIE_NAME];
}

function setUserToRequest(req, user) {
  req.user = user;
}

module.exports = {
  createAuthMiddleware,
};
