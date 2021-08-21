module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
    GET_PRISMA_CLIENT: true,
  },
  globalSetup: '<rootDir>/test/config/setup-tests.js',
  globalTeardown: '<rootDir>/test/config/teardown-tests.js',
  setupFilesAfterEnv: ['jest-extended'],
  testEnvironment: 'node',
  testRegex: ['/(?:test)/.+\\.test\\.ts$'],
};
