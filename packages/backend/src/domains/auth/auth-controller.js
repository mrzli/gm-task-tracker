const { DOMAIN_NAME_ENUM } = require('../_shared/domain-name');
const { HTTP_VERB_ENUM } = require('../_shared/http-verb');

function initializeAuthController({ controllerFactory, authService }) {
  const endpoints = [
    {
      method: HTTP_VERB_ENUM.post,
      route: '/register',
      middlewares: undefined,
      handler: async (req, res) => {
        const result = await authService.register(req.body);
        res.json(result);
      },
    },
    // {
    //   method: HTTP_VERB_ENUM.post,
    //   route: '/insert',
    //   middlewares: undefined,
    //   handler: async (req, res) => {
    //     await exampleDbProvider.db
    //       .collection('Example')
    //       .insertOne({ value: new Date() });
    //     res.end();
    //   },
    // },
  ];

  controllerFactory.create(DOMAIN_NAME_ENUM.auth, endpoints);
}

module.exports = { initializeAuthController };
