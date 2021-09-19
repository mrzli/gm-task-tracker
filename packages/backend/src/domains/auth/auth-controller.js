const { z } = require('zod');
const { DOMAIN_NAME_ENUM } = require('../_shared/domain-name');
const { HTTP_VERB_ENUM } = require('../_shared/http-verb');
const { ENDPOINT_AUTH_TYPE_ENUM } = require('../../shared/endpoint-auth-type');
const { sanitizeUser } = require('./utils');

// const validator = require('validator');

function initializeAuthController({
  // configOptions,
  controllerFactory,
  authService,
}) {
  const endpoints = [
    {
      method: HTTP_VERB_ENUM.post,
      route: '/register',
      auth: {
        type: ENDPOINT_AUTH_TYPE_ENUM.public,
      },
      validators: {
        body: z
          .object({
            email: z.string().min(1).max(256).email(),
            password: z.string().min(1).max(256),
            // .refine(
            //   (v) => validator.isStrongPassword(v),
            //   'NotStrongPassword'
            // ),
            confirmPassword: z.string().min(1).max(256),
          })
          .strict()
          .refine(
            (v) => v.password === v.confirmPassword,
            'PasswordsDontMatch'
          ),
      },
      handler: async (req, res) => {
        const result = await authService.register(req.body);
        res.json(sanitizeUser(result));
      },
    },
    {
      method: HTTP_VERB_ENUM.post,
      route: '/login',
      auth: {
        type: ENDPOINT_AUTH_TYPE_ENUM.public,
      },
      validators: {
        body: z
          .object({
            email: z.string().min(1).max(256).email(),
            password: z.string().min(1).max(256),
          })
          .strict(),
      },
      handler: async (req, res) => {
        const result = await authService.login(req.body);
        // res.cookie(
        //   AUTH_COOKIE_NAME,
        //   result.token.token,
        //   getAuthCookieOptions(configOptions, result.token)
        // );
        const responseJson = {
          token: result.token.token,
          user: sanitizeUser(result.user),
        };
        res.json(responseJson);
      },
    },
    {
      method: HTTP_VERB_ENUM.post,
      route: '/logout',
      auth: {
        type: ENDPOINT_AUTH_TYPE_ENUM.anyUser,
      },
      validators: {},
      handler: async (req, res) => {
        // res.clearCookie(AUTH_COOKIE_NAME);
        await authService.logout(req.user);
        res.end();
      },
    },
    {
      method: HTTP_VERB_ENUM.get,
      route: '/user',
      auth: {
        type: ENDPOINT_AUTH_TYPE_ENUM.anyUser,
      },
      validators: undefined,
      handler: async (req, res) => {
        res.json(req.user);
      },
    },
  ];

  controllerFactory.create(DOMAIN_NAME_ENUM.auth, endpoints);
}

// function getAuthCookieOptions(configOptions, token) {
//   return {
//     secure: configOptions.nodeEnv === NODE_ENV_PRODUCTION,
//     httpOnly: true,
//     expires: token.expirationDate,
//   };
// }

module.exports = { initializeAuthController };
