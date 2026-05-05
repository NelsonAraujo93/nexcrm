import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 65,
      functions: 80,
      lines: 80,
    },
  },
};

export default config;
