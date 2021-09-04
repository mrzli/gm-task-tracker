const { AUTH_COLLECTION_NAME_ENUM } = require('./auth-collection-name');

function createAuthService({ authDbProvider }) {
  return {
    register,
  };

  async function register(data) {
    const result = await authDbProvider.db
      .collection(AUTH_COLLECTION_NAME_ENUM.user)
      .insertOne({ email: 'a@b.com' });
    return 'register2';
  }
}

module.exports = {
  createAuthService,
};
