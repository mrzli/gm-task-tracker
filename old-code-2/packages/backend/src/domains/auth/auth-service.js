const { objectPickFields } = require('@mrzli/gm-js-libraries-utilities/object');
const { UnauthorizedError } = require('../../shared/errors');

function createAuthService({
  authUtils,
  tokenService,
  userService,
  configOptions,
}) {
  return {
    register,
    login,
    logout,
  };

  async function register(data) {
    const password = await authUtils.hashPassword(
      data.password,
      configOptions.hashSaltRounds
    );

    const user = {
      ...objectPickFields(data, ['email']),
      password,
    };

    return userService.createUser(user);
  }

  async function login(data) {
    const user = await userService.getUserByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError();
    }

    const isPasswordOk = await authUtils.checkPassword(
      data.password,
      user.password
    );
    if (!isPasswordOk) {
      throw new UnauthorizedError();
    }

    await tokenService.deleteAllUserTokens(user._id);
    const token = await tokenService.createToken(user._id);

    return { user, token };
  }

  async function logout(user) {
    await tokenService.deleteAllUserTokens(user._id);
  }
}

module.exports = {
  createAuthService,
};
