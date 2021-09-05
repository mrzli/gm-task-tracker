const { AUTH_COLLECTION_NAME_ENUM } = require('./auth-collection-name');

function createUserService({ authDbProvider, tokenService }) {
  return {
    createUser,
    getUserById,
    getUserByEmail,
    getUserByToken,
  };

  async function createUser(user) {
    const { insertedId } = await getUserCollection(authDbProvider).insertOne(
      user
    );
    return getUserCollection(authDbProvider).findOne({
      _id: insertedId,
    });
  }

  async function getUserById(id) {
    return getUserCollection(authDbProvider).findOne({ _id: id });
  }

  async function getUserByEmail(email) {
    return getUserCollection(authDbProvider).findOne({ email });
  }

  async function getUserByToken(token) {
    const tokenObj = await tokenService.getTokenByToken(token);
    return getUserById(tokenObj.userId);
  }
}

function getUserCollection(authDbProvider) {
  return authDbProvider.db.collection(AUTH_COLLECTION_NAME_ENUM.user);
}

module.exports = {
  createUserService,
};
