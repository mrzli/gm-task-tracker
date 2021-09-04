const awilix = require('awilix');
const { asValue, Lifetime, asClass, asFunction } = require('awilix');
const { configOptions } = require('./config');
const { App } = require('./app');
const { createRouteResolver } = require('../routes/route-resolver');
const { DbProvider } = require('../shared/db-provider');
const {
  DOMAIN_NAME_ENUM,
  DOMAIN_NAME_LIST,
} = require('../domains/_shared/domain-names');

async function createContainer() {
  const container = awilix.createContainer();

  container.register({ configOptions: asValue(configOptions) });

  container.register({
    routeResolver: asFunction(createRouteResolver, {
      lifetime: Lifetime.SINGLETON,
    }),
    app: asClass(App, { lifetime: Lifetime.SINGLETON }),
  });

  const dbProviders = await createDbProviders(container);
  container.register(dbProviders);

  return container;
}

async function createDbProviders(container) {
  const dbProviders = {};
  for (const domainName of DOMAIN_NAME_LIST) {
    dbProviders[`${domainName}DbProvider`] = asValue(
      await createDbProvider(container.cradle, DOMAIN_NAME_ENUM.example)
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
