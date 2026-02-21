const cypress = require("eslint-plugin-cypress");
const prettier = require("eslint-plugin-prettier");

module.exports = [
  {
    ignores: [
      "node_modules/**",
      "cypress/videos/**",
      "cypress/screenshots/**",
      "cypress/downloads/**",
    ],
  },
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        cy: "readonly",
        Cypress: "readonly",
        expect: "readonly",
        describe: "readonly",
        it: "readonly",
        before: "readonly",
        beforeEach: "readonly",
        after: "readonly",
        afterEach: "readonly",
      },
    },
    plugins: {
      cypress,
      prettier,
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prettier/prettier": "error",
    },
  },
  {
    files: ["cypress/**/*.js"],
    rules: {
      "no-undef": "off",
    },
  },
];
