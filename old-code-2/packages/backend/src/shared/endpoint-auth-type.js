const ENDPOINT_AUTH_TYPE_ENUM = Object.freeze({
  public: 'public',
  anyUser: 'anyUser',
  permission: 'permission',
});
const ENDPOINT_AUTH_TYPE_LIST = Object.keys(ENDPOINT_AUTH_TYPE_ENUM);

module.exports = {
  ENDPOINT_AUTH_TYPE_ENUM,
  ENDPOINT_AUTH_TYPE_LIST,
};
