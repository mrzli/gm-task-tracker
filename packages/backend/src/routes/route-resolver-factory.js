function createRouteResolverFactory({ configOptions }) {
  return {
    create: (controllerName) =>
      createRouteResolver(configOptions.apiPrefix, controllerName),
  };
}

function createRouteResolver(apiPrefix, controllerName) {
  return {
    resolve: (path) => apiPrefix + '/' + controllerName + path,
  };
}

module.exports = {
  createRouteResolverFactory,
};
