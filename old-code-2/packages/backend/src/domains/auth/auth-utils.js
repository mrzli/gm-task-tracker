const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');

function createAuthUtils() {
  return {
    hashPassword,
    checkPassword,
    generateAccessToken,
  };
}

async function hashPassword(plainTextPassword, saltRounds) {
  return bcrypt.hash(plainTextPassword, saltRounds);
}

async function checkPassword(plainTextPassword, hash) {
  return bcrypt.compare(plainTextPassword, hash);
}

function generateAccessToken() {
  return nanoid(40);
}

module.exports = {
  createAuthUtils,
};
