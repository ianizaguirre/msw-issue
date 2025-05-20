const esModules = ['normalize-url'].join('|');

const nextJest = require('next/jest');

/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const config = {
  displayName: {
    name: 'Cloud-Console',
    color: 'cyan',
  },
  coverageThreshold: {
    global: {
      statements: 70, // goal: 75
      branches: 70,
      functions: 70,
      lines: 70, // goal: 75
    },
  },
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  verbose: true,

  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle image imports
    '^.+\\.(jpg|jpeg|png|gif|webp|avif)$': '<rootDir>/__mocks__/fileMock.js',
    '^.+\\.(svg)$': '<rootDir>/__mocks__/svg.tsx',

    // Handle module aliases
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@layout/(.*)$': '<rootDir>/src/components/layout/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@context/(.*)$': '<rootDir>/src/context/$1',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },

  setupFiles: [
    // '<rootDir>/jest.setup.mocks.ts'
  ],

  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
    // '<rootDir>/__mocks__/jest.next-router-mock.ts',
    // '<rootDir>/__mocks__/jest.mock-next-head.ts',
    // '<rootDir>/__mocks__/jest.mock-resize-observer.ts',
  ],

  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: 'v8',

  /**
   * @see https://github.com/mswjs/jest-fixed-jsdom/tree/main
   */
  testEnvironment: 'jest-fixed-jsdom',

  transform: {
    // Use babel-jest to transpile tests with the next/babel preset
    // https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],

  /*
  Sometimes 3rd party modules are published as untranspiled code.
  Since all files inside node_modules are not transformed by default,
  Jest will not understand the code in these modules, resulting in syntax errors.
  To overcome this, you may use transformIgnorePatterns to allow transpiling such modules.
  @see: https://jestjs.io/docs/tutorial-react-native#transformignorepatterns-customization
  */
  // Jest will ignore all node_modules by default, except for the list "esModules" is assigned.
  transformIgnorePatterns: [`node_modules/(?!${esModules})`, '^.+\\.module\\.(css|sass|scss)$'],

  testEnvironmentOptions: {
    /**
     * MSW with JSDOM requires this option setting.
     * @see https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom
     */
    customExportConditions: [''],
  },
};

module.exports = createJestConfig(config);
