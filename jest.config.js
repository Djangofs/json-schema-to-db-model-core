module.exports = {
  verbose: true,
  testEnvironment: "node",
  collectCoverageFrom: [
    "**/*.{js}",
    "!**/index.js",
    "!**/node_modules/**",
    "!**/jest.config.js",
    "!**/tests/*",
    "!**/coverage/**",
    "!**/templates/**",
    "!**/testSchemas/**"
  ]
};
