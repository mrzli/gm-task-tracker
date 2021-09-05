const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { MongoServerError } = require('mongodb');

function initializeErrorHandler({ app, logger }) {
  app.use((error, req, res, next) => {
    logger.error('Error: ', error);
  });

  process.on('uncaughtException', function (error) {
    logger.error('Uncaught Exception', error);
    process.exit(1);
  });
}

const INTERNAL_SERVER_ERROR = {
  status: StatusCodes.INTERNAL_SERVER_ERROR,
  data: {
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  },
};

function createExceptionHandler({ logger }) {
  return {
    handle,
  };

  function handle(error) {
    logger.error('Exception: ', error);
    if (error instanceof MongoServerError) {
      switch (error.code) {
        case 11000:
          return {
            status: StatusCodes.BAD_REQUEST,
            data: {
              message: 'DuplicateKey',
              fields: Object.keys(error.keyPattern),
            },
          };
        default:
          return INTERNAL_SERVER_ERROR;
      }
    } else {
      return INTERNAL_SERVER_ERROR;
    }
  }
}

module.exports = {
  initializeErrorHandler,
  createExceptionHandler,
};
