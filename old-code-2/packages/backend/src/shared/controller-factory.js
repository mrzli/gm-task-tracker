const {
  createValidationMiddleware,
  REQUEST_PART_ENUM,
} = require('./validation');
const { createAuthMiddleware } = require('../domains/auth/auth-middleware');

function createControllerFactory(cradle) {
  return {
    create: (controllerName, endpoints) =>
      createController(cradle, controllerName, endpoints),
  };
}

function createController(cradle, controllerName, endpoints) {
  const routeResolver = cradle.routeResolverFactory.create(controllerName);

  for (const endpoint of endpoints) {
    addEndpoint(cradle, routeResolver, endpoint);
  }
}

function addEndpoint(cradle, routeResolver, endpoint) {
  const { app, exceptionHandler, userService } = cradle;

  const route = routeResolver.resolve(endpoint.route);

  const auth = endpoint.auth;
  if (!auth || !auth.type) {
    throw new Error(
      `Need to specify endpoint auth type. Endpoint route: '${route}'`
    );
  }

  const validators = endpoint.validators || {};

  const middlewares = [
    createAuthMiddleware(auth.type, userService),
    validators.body
      ? createValidationMiddleware(validators.body, {
          part: REQUEST_PART_ENUM.body,
        })
      : undefined,
    validators.params
      ? Object.keys(validators.params).reduce(
          (acc, key) => [
            ...acc,
            createValidationMiddleware(validators.params[key], {
              part: REQUEST_PART_ENUM.params,
              name: key,
            }),
          ],
          []
        )
      : undefined,
    validators.query
      ? Object.keys(validators.query).reduce(
          (acc, key) => [
            ...acc,
            createValidationMiddleware(validators.query[key], {
              part: REQUEST_PART_ENUM.query,
              name: key,
            }),
          ],
          []
        )
      : undefined,
  ].filter((item) => item !== undefined);

  app[endpoint.method](route, ...middlewares, async (req, res, next) => {
    try {
      await endpoint.handler(req, res, next);
    } catch (error) {
      const result = exceptionHandler.handle(error);
      res.status(result.status).json(result.data);
    }
  });
}

module.exports = {
  createControllerFactory,
};
