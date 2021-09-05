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
    app[endpoint.method](
      routeResolver.resolve(endpoint.route),
      ...(endpoint.middlewares || []),
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
}

module.exports = {
  createControllerFactory,
};
