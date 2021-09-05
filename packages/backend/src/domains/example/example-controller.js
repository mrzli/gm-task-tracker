const { DOMAIN_NAME_ENUM } = require('../_shared/domain-name');
const { HTTP_VERB_ENUM } = require('../_shared/http-verb');

function initializeExampleController({ controllerFactory, exampleDbProvider }) {
  const endpoints = [
    {
      method: HTTP_VERB_ENUM.get,
      route: '/get',
      middleware: undefined,
      handler: async (req, res) => {
        const data = await exampleDbProvider.db
          .collection('Example')
          .find({})
          .toArray();
        res.json(data);
      },
    },
    {
      method: HTTP_VERB_ENUM.post,
      route: '/insert',
      middleware: undefined,
      handler: async (req, res) => {
        await exampleDbProvider.db
          .collection('Example')
          .insertOne({ value: new Date() });
        res.end();
      },
    },
  ];

  controllerFactory.create(DOMAIN_NAME_ENUM.example, endpoints);
}

module.exports = { initializeExampleController };
