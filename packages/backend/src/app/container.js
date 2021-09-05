const awilix = require('awilix');
const { asValue, Lifetime, asClass, asFunction } = require('awilix');
const { configOptions } = require('./config');
const { AppWrapper } = require('./app');
const {
  createRouteResolverFactory,
} = require('../routes/route-resolver-factory');
const { DbProvider } = require('../shared/db-provider');
const { DOMAIN_NAME_LIST } = require('../domains/_shared/domain-name');
const { createControllerFactory } = require('../shared/controller-factory');
const { createAuthService } = require('../domains/auth/auth-service');
const { Logger } = require('../logging/logger');
const { createExceptionHandler } = require('../middleware/error-handler');

async function createContainer() {
  const container = awilix.createContainer();

  container.register({ configOptions: asValue(configOptions) });

  const singleton = { lifetime: Lifetime.SINGLETON };

  container.register({
    appWrapper: asClass(AppWrapper, singleton),
    app: asFunction(({ appWrapper }) => appWrapper.app, singleton),
    logger: asClass(Logger, singleton),
    exceptionHandler: asFunction(createExceptionHandler, singleton),
    routeResolverFactory: asFunction(createRouteResolverFactory, singleton),
    controllerFactory: asFunction(createControllerFactory, singleton),
    authService: asFunction(createAuthService, singleton),
  });

  const dbProviders = await createDbProviders(container);
  container.register(dbProviders);

  return container;
}

async function createDbProviders(container) {
  const dbProviders = {};
  for (const domainName of DOMAIN_NAME_LIST) {
    dbProviders[`${domainName}DbProvider`] = asValue(
      await createDbProvider(container.cradle, domainName)
    );
  }
  return dbProviders;
}

async function createDbProvider({ configOptions }, domainName) {
  const provider = new DbProvider(configOptions, domainName);
  await provider.connect();
  return provider;
}

module.exports = {
  createContainer,
};
