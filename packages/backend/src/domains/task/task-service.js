const { TASK_COLLECTION_NAME_ENUM } = require('./task-collection-name');
const { ObjectId } = require('mongodb');

function createTaskService({ taskDbProvider }) {
  return {
    getTasksByUserId,
  };

  async function getTasksByUserId(userId) {
    return getTaskCollection(taskDbProvider).find({
      userId: new ObjectId(userId),
    });
  }
}

function getTaskCollection(taskDbProvider) {
  return taskDbProvider.db.collection(TASK_COLLECTION_NAME_ENUM.task);
}

module.exports = {
  createTaskService,
};
