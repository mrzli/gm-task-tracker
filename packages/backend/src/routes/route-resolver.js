function createRouteResolver({ configOptions }) {
  return {
    resolve: (path) => configOptions.routePrefix + path,
  };
}

module.exports = {
  createRouteResolver,
};
