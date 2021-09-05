const {
  createValidationMiddleware,
  REQUEST_PART_ENUM,
} = require('../middleware/validation');

function createControllerFactory({
  app,
  logger,
  routeResolverFactory,
  exceptionHandler,
}) {
  return {
    create: (controllerName, endpoints) =>
      createController(
        app,
        logger,
        routeResolverFactory,
        exceptionHandler,
        controllerName,
        endpoints
      ),
  };
}

function createController(
  app,
  logger,
  routeResolverFactory,
  exceptionHandler,
  controllerName,
  endpoints
) {
  const routeResolver = routeResolverFactory.create(controllerName);

  for (const endpoint of endpoints) {
    addEndpoint(app, routeResolver, exceptionHandler, endpoint);
  }
}

function addEndpoint(app, routeResolver, exceptionHandler, endpoint) {
  const middleware = endpoint.middleware || {};
  const validators = middleware.validators || {};

  const validatorMiddlewares = [
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

  app[endpoint.method](
    routeResolver.resolve(endpoint.route),
    ...validatorMiddlewares,
    async (req, res, next) => {
      try {
        await endpoint.handler(req, res, next);
      } catch (error) {
        const result = exceptionHandler.handle(error);
        res.status(result.status).json(result.data);
      }
    }
  );
}

module.exports = {
  createControllerFactory,
};
