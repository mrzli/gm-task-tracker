function initializeExampleController(
  app,
  { routeResolver, exampleDbProvider }
) {
  app.get(routeResolver.resolve('/get'), async (req, res) => {
    const data = await exampleDbProvider.db
      .collection('Example')
      .find({})
      .toArray();
    res.json(data);
  });

  app.post(routeResolver.resolve('/insert'), async (req, res) => {
    await exampleDbProvider.db
      .collection('Example')
      .insertOne({ value: new Date() });
    res.end();
  });
}

module.exports = { initializeExampleController };
