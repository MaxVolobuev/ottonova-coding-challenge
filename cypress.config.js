const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 60000,
  watchForFileChanges: false,

  e2e: {
    baseUrl: "https://www.ottonova.de",
  },
});
