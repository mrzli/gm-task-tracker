const bcrypt = require('bcrypt');
const {
  createArrayOfLength,
} = require('@mrzli/gm-js-libraries-utilities/array');
const {
  padNonNegativeIntWithZeroes,
} = require('@mrzli/gm-js-libraries-utilities/number');

async function createUsers(count) {
  return await Promise.all(
    createArrayOfLength(count).map(async (_value, index) => {
      const idStr = padNonNegativeIntWithZeroes(index, 3);
      return {
        email: `a@b${idStr}.com`,
        password: await bcrypt.hash(`pass${idStr}`, 12),
      };
    })
  );
}

module.exports = {
  createUsers,
};
