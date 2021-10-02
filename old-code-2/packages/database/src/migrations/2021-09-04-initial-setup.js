const {
  DOMAIN_NAME_ENUM,
} = require('../../../backend/src/domains/_shared/domain-name');
const {
  AUTH_COLLECTION_NAME_ENUM,
} = require('../../../backend/src/domains/auth/auth-collection-name');
const { getDb } = require('../utils/utils');

module.exports = {
  version: 1,
  migrate: async (client) => {
    const authDb = getDb(client, DOMAIN_NAME_ENUM.auth);
    await authDb
      .collection(AUTH_COLLECTION_NAME_ENUM.user)
      .createIndex({ email: 1 }, { unique: true });
    await authDb
      .collection(AUTH_COLLECTION_NAME_ENUM.token)
      .createIndex({ userId: 1 }, { unique: true });
    await authDb
      .collection(AUTH_COLLECTION_NAME_ENUM.token)
      .createIndex({ token: 1 });
  },
};
