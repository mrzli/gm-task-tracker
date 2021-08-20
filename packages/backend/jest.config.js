module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
    },
  },
  globalSetup: '<rootDir>/test/config/setup-tests.js',
  testEnvironment: 'node',
  testRegex: ['/(?:test)/.+\\.test\\.ts$'],
};
