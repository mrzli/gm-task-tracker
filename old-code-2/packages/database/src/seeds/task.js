const {
  createArrayOfLength,
  flatMap,
} = require('@mrzli/gm-js-libraries-utilities/array');
const {
  padNonNegativeIntWithZeroes,
} = require('@mrzli/gm-js-libraries-utilities/number');

async function createTasks(userIds, countPerUserId, offsetPerUserId) {
  console.log(userIds);
  return flatMap(userIds, (userId, i1) =>
    createArrayOfLength(countPerUserId).map((_value, i2) => {
      const idStr = padNonNegativeIntWithZeroes(i1 * offsetPerUserId + i2, 3);
      return {
        userId,
        text: `Task ${idStr}`,
      };
    })
  );
}

module.exports = {
  createTasks,
};
