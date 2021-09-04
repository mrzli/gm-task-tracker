function createControllerFactory({ app, routeResolverFactory }) {
  return {
    create: (controllerName, endpoints) =>
      createController(app, routeResolverFactory, controllerName, endpoints),
  };
}

function createController(
  app,
  routeResolverFactory,
  controllerName,
  endpoints
) {
  const routeResolver = routeResolverFactory.create(controllerName);

  for (const endpoint of endpoints) {
    app[endpoint.method](
      routeResolver.resolve(endpoint.route),
      ...(endpoint.middlewares || []),
      endpoint.handler
    );
  }
}

module.exports = {
  createControllerFactory,
};
