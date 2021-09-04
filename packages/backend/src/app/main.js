const { emptyFn } = require('@mrzli/gm-js-libraries-utilities/function');
const { createContainer } = require('./container');
const {
  initializeExampleController,
} = require('../domains/example/example-controller');
const { initializeAuthController } = require('../domains/auth/auth-controller');

async function initializeContainerAndStartApp() {
  const container = await createContainer();
  await startApp(container);
}

async function startApp(container) {
  const app = container.resolve('appWrapper');
  await app.initialize();
  initializeControllers(container.cradle);
  await app.start();
}

function initializeControllers(container) {
  const controllers = [initializeExampleController, initializeAuthController];
  controllers.forEach((controller) => {
    controller(container);
  });
}

initializeContainerAndStartApp().finally(emptyFn);
