const {
  DOMAIN_NAME_ENUM,
} = require('../../../backend/src/domains/_shared/domain-name');
const {
  AUTH_COLLECTION_NAME_ENUM,
} = require('../../../backend/src/domains/auth/auth-collection-name');
const { getDatabaseName } = require('../utils/utils');

module.exports = {
  version: 1,
  migrate: async (client) => {
    const authDb = client.db(getDatabaseName(DOMAIN_NAME_ENUM.auth));
    await authDb
      .collection(AUTH_COLLECTION_NAME_ENUM.user)
      .createIndex({ email: 1 }, { unique: true });
  },
};
