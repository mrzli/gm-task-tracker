const { emptyFn } = require('@mrzli/gm-js-libraries-utilities/function');
const { createContainer } = require('./container');

async function startApp(container) {
  const app = container.resolve('app');
  await app.initialize();
  await app.start();
}

async function initializeContainerAndStartApp() {
  const container = await createContainer();
  await startApp(container);
}

initializeContainerAndStartApp().finally(emptyFn);
