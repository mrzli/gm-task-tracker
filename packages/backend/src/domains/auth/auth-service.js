const { AUTH_COLLECTION_NAME_ENUM } = require('./auth-collection-name');
const {
  objectPickFields,
  objectOmitFields,
} = require('@mrzli/gm-js-libraries-utilities/object');

function createAuthService({ authDbProvider, authUtils, configOptions }) {
  return {
    register,
  };

  async function register(data) {
    const user = {
      ...objectPickFields(data, ['email']),
      password: authUtils.hashPassword(
        data.password,
        configOptions.hashSaltRounds
      ),
    };
    const { insertedId } = await authDbProvider.db
      .collection(AUTH_COLLECTION_NAME_ENUM.user)
      .insertOne(user);
    const updatedUser = await authDbProvider.db
      .collection(AUTH_COLLECTION_NAME_ENUM.user)
      .findOne({ _id: insertedId });
    return objectOmitFields(updatedUser, ['password']);
  }
}

module.exports = {
  createAuthService,
};
