const {
  createVolatileDateTimeApi,
} = require('@mrzli/gm-js-libraries-utilities/date');

function createDateTimeUtils() {
  const volatileDateTimeApi = createVolatileDateTimeApi();
  return {
    millisecondsSinceEpoch: () => volatileDateTimeApi.millisecondsSinceEpoch(),
  };
}

module.exports = {
  createDateTimeUtils,
};
