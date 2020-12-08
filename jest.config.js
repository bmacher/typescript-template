/**
 * @author Benjamin Macher
 * @description Jest config for TypeScript projects.
 *
 * @dependencies
 * yarn add --dev jest @jest/globals ts-jest
 *
 * @commands
 * package.json
 * "scripts": [
 *   "test": "jest",
 *   "test:verbose": "jest --verbose",
 *   "test:coverage": "jest --coverage"
 *  ]
 */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  testMatch: [
    '**/?(*.)+(spec|test).ts',
  ],
};
