const REQUEST_PART_ENUM = Object.freeze({
  body: 'body',
  params: 'params',
  query: 'query',
  cookies: 'cookies',
  signedCookies: 'signedCookies',
});

function getValueFromRequest(request, { part, name }) {
  switch (part) {
    case REQUEST_PART_ENUM.body:
      return request.body;
    case REQUEST_PART_ENUM.params:
      return request.params[name];
    case REQUEST_PART_ENUM.query:
      return request.query[name];
    case REQUEST_PART_ENUM.cookies:
      return request.cookies[name];
    case REQUEST_PART_ENUM.signedCookies:
      return request.signedCookies[name];
    default:
      throw new Error(`Invalid request part: '${part}'`);
  }
}

async function validate(schema, value) {
  return schema.safeParseAsync(value);
}

function createValidationMiddleware(schema, { part, name }) {
  return async (req, res, next) => {
    const value = getValueFromRequest(req, { part, name });
    const result = await validate(schema, value);
    if (!result.success) {
      next(result.error);
    }
    next();
  };
}

module.exports = {
  REQUEST_PART_ENUM,
  createValidationMiddleware,
};
