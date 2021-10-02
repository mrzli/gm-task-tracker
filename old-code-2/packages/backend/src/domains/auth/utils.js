const { objectOmitFields } = require('@mrzli/gm-js-libraries-utilities/object');

function sanitizeUser(user) {
  return objectOmitFields(user, ['password']);
}

module.exports = {
  sanitizeUser,
};
