const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { MongoServerError } = require('mongodb');
const { ZodError } = require('zod');

function initializeErrorHandler({ app, logger, exceptionHandler }) {
  app.use((error, req, res, _next) => {
    const result = exceptionHandler.handle(error);
    res.status(result.status).json(result.data);
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
    if (error instanceof ZodError) {
      const { name, ...errorData } = error;
      return {
        status: StatusCodes.BAD_REQUEST,
        data: {
          error: name,
          ...errorData,
        },
      };
    } else if (error instanceof MongoServerError) {
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
