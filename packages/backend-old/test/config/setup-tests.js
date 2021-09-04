const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { joinPath } = require('@mrzli/gm-js-libraries-node-utils/path');

function setupEnv() {
  const env = dotenv.config({ path: joinPath(__dirname, '.env') });
  dotenvExpand(env);
}

module.exports = async () => {
  console.log('Test setup started...');
  setupEnv();
};
