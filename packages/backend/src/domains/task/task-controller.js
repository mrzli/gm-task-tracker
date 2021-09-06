const { DOMAIN_NAME_ENUM } = require('../_shared/domain-name');
const { HTTP_VERB_ENUM } = require('../_shared/http-verb');
const { ENDPOINT_AUTH_TYPE_ENUM } = require('../../shared/endpoint-auth-type');

function initializeTaskController({ controllerFactory }) {
  const endpoints = [
    {
      method: HTTP_VERB_ENUM.get,
      route: '/tasks',
      auth: {
        type: ENDPOINT_AUTH_TYPE_ENUM.permission,
      },
      validators: undefined,
      handler: async (req, res) => {
        const result = ['1', '2'];
        res.json(result);
      },
    },
  ];

  controllerFactory.create(DOMAIN_NAME_ENUM.task, endpoints);
}

module.exports = {
  initializeTaskController,
};
