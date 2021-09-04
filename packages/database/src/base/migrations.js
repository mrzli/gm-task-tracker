const { resolve } = require('path');
const globCallback = require('glob');
const {
  sortArray,
  compareFnNumberAsc,
} = require('@mrzli/gm-js-libraries-utilities/array');
const { configOptions } = require('../utils/config');
const { MongoClient } = require('mongodb');
const { getDatabaseName } = require('../utils/utils');
const { program } = require('commander');
const {
  DOMAIN_NAME_LIST,
} = require('../../../backend/src/domains/_shared/domain-name');

const glob = (pattern, options) =>
  new Promise((resolve, reject) => {
    globCallback(pattern, options, (err, matches) => {
      if (err) {
        reject(err);
      }

      resolve(matches);
    });
  });

const METADATA_DATABASE_NAME = 'meta';
const METADATA_COLLECTION = 'db-metadata';

async function runMigrations() {
  program.option('-r, --reset', 'reset database');
  program.parse(process.argv);
  const options = program.opts();
  console.log(options);

  const client = new MongoClient(configOptions.dbServerUrl);
  await client.connect();
  const db = client.db(getDatabaseName(METADATA_DATABASE_NAME));

  if (options.reset) {
    console.log('Resetting database...');
    await db.dropDatabase();
    for (const domainName of DOMAIN_NAME_LIST) {
      await client.db(getDatabaseName(domainName)).dropDatabase();
    }
  }

  const metadataEntry = await getMetadataEntry(db);
  const currentDbVersion = metadataEntry ? metadataEntry.version || 0 : 0;

  const files = await glob('./src/migrations/**/*.js');
  const migrations = files.map((file) => require(resolve(process.cwd(), file)));
  const sortedMigrations = sortArray(migrations, (m1, m2) =>
    compareFnNumberAsc(m1.version, m2.version)
  );

  for (const migration of sortedMigrations) {
    if (migration.version > currentDbVersion) {
      await migration.migrate(client);
    }
  }

  const newDbVersion =
    sortedMigrations.length > 0
      ? sortedMigrations[sortedMigrations.length - 1].version
      : 0;

  if (newDbVersion <= 0) {
    return;
  }

  if (metadataEntry) {
    await db
      .collection(METADATA_COLLECTION)
      .updateOne(
        { _id: metadataEntry._id },
        { $set: { version: newDbVersion } }
      );
  } else {
    await db
      .collection(METADATA_COLLECTION)
      .insertOne({ version: newDbVersion });
  }
}

async function getMetadataEntry(db) {
  const metadataEntries = await db
    .collection(METADATA_COLLECTION)
    .find({})
    .toArray();

  return metadataEntries.length > 0 ? metadataEntries[0] : undefined;
}

runMigrations()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Migrations ran.');
    process.exit(0);
  });
