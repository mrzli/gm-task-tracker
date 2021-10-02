const { z } = require('zod');
const { DOMAIN_NAME_ENUM } = require('../_shared/domain-name');
const { HTTP_VERB_ENUM } = require('../_shared/http-verb');
const { ENDPOINT_AUTH_TYPE_ENUM } = require('../../shared/endpoint-auth-type');

function initializeTaskController({ controllerFactory, taskService }) {
  const endpoints = [
    {
      method: HTTP_VERB_ENUM.get,
      route: '/tasks/:userId',
      auth: {
        type: ENDPOINT_AUTH_TYPE_ENUM.permission,
      },
      validators: {
        params: {
          userId: z.string().length(24),
        },
      },
      handler: async (req, res) => {
        const userId = req.params.userId;
        const result = await taskService.getTasksByUserId(userId);
        res.json(result);
      },
    },
  ];

  controllerFactory.create(DOMAIN_NAME_ENUM.task, endpoints);
}

module.exports = {
  initializeTaskController,
};
