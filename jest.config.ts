//! const nextJest = require("next/jest");
import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.ts and .env files in your test environment
  dir: "./",
});

const config: Config = {
  collectCoverageFrom: ["**/*.{ts,tsx}"],
  coverageReporters: ["json-summary", "text", "lcov"],
  verbose: true,

  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle image imports
    "^.+\\.(jpg|jpeg|png|gif|webp|avif)$": "<rootDir>/__mocks__/fileMock.js",
    "^.+\\.(svg)$": "<rootDir>/__mocks__/svg.tsx",

    // Handle module aliases
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@layout/(.*)$": "<rootDir>/src/components/layout/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@test/(.*)$": "<rootDir>/test/$1",
  },

  // setupFiles: ["<rootDir>/jest.setup.mocks.ts"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // on node 14.x coverage provider v8 offers good speed and more or less good report
  coverageProvider: "v8",

  /**
   * @see https://github.com/mswjs/jest-fixed-jsdom/tree/main
   */
  testEnvironment: "jest-fixed-jsdom",

  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],

  testEnvironmentOptions: {
    /**
     * MSW with JSDOM requires this option setting.
     * @see https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom
     */
    customExportConditions: [""],
  },
};

module.exports = createJestConfig(config);
