const express = require('express');
const { MongoClient } = require('mongodb');
const { envVars } = require('./env');
const { emptyFn } = require('@mrzli/gm-js-libraries-utilities/function');

async function createApp() {
  const app = express();
  const client = new MongoClient(envVars.DB_SERVER_URL);
  await client.connect();
  const db = client.db(envVars.DB_NAME);

  app.get('/api/get', async (req, res) => {
    const data = await db.collection('Test').find({}).toArray();
    res.json(data);
  });

  app.post('/api/insert', async (req, res) => {
    await db.collection('Test').insertOne({ value: new Date() });
    res.end();
  });

  return app;
}

async function startApp() {
  const app = await createApp();
  await app.listen(envVars.PORT);
  console.log(`Server listening on port '${envVars.PORT}'`);
}

startApp().finally(emptyFn);
