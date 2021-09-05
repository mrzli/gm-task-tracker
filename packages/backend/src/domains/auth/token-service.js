const { AUTH_COLLECTION_NAME_ENUM } = require('./auth-collection-name');
const {
  millisecondSinceEpochToDate,
  addTime,
  TimeUnit,
} = require('@mrzli/gm-js-libraries-utilities/date');

function createTokenService({ authDbProvider, dateTimeUtils, authUtils }) {
  return {
    createToken,
    getTokenById,
    getTokenByToken,
    deleteAllUserTokens,
  };

  async function createToken(userId) {
    const currentDate = millisecondSinceEpochToDate(
      dateTimeUtils.millisecondsSinceEpoch()
    );
    const expirationDate = addTime(currentDate, 1, TimeUnit.Day);

    const { insertedId } = await getTokenCollection(authDbProvider).insertOne({
      userId: userId,
      token: authUtils.generateAccessToken(),
      expirationDate,
    });
    return getTokenById(insertedId);
  }

  async function getTokenById(id) {
    return getTokenCollection(authDbProvider).findOne({ _id: id });
  }

  async function getTokenByToken(token) {
    return getTokenCollection(authDbProvider).findOne({ token });
  }

  async function deleteAllUserTokens(userId) {
    await getTokenCollection(authDbProvider).deleteMany({ userId });
  }
}

function getTokenCollection(authDbProvider) {
  return authDbProvider.db.collection(AUTH_COLLECTION_NAME_ENUM.token);
}

module.exports = {
  createTokenService,
};
