const { connectToDbServer, getDb } = require('../utils/utils');
const { createUsers } = require('../seeds/user');
const {
  DOMAIN_NAME_ENUM,
} = require('../../../backend/src/domains/_shared/domain-name');
const {
  AUTH_COLLECTION_NAME_ENUM,
} = require('../../../backend/src/domains/auth/auth-collection-name');
const { createTasks } = require('../seeds/task');
const {
  TASK_COLLECTION_NAME_ENUM,
} = require('../../../backend/src/domains/task/task-collection-name');

async function seedDatabase() {
  const client = await connectToDbServer();
  const authDb = getDb(client, DOMAIN_NAME_ENUM.auth);
  const taskDb = getDb(client, DOMAIN_NAME_ENUM.task);

  const users = await createUsers(10);
  await authDb.collection(AUTH_COLLECTION_NAME_ENUM.user).insertMany(users);
  const userIds = await authDb
    .collection(AUTH_COLLECTION_NAME_ENUM.user)
    .find({})
    .project({ _id: 1 })
    .map((doc) => doc._id)
    .toArray();

  const tasks = await createTasks(userIds, 5, 100);
  await taskDb.collection(TASK_COLLECTION_NAME_ENUM.task).insertMany(tasks);
}

seedDatabase()
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Database seeded.');
    process.exit(0);
  });
