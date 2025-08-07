const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',

  transform: {
    ...tsJestTransformCfg,
  },

  moduleDirectories: ['node_modules', '<rootDir>'],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  resetMocks: true,
  clearMocks: true,
  restoreMocks: true,
};
