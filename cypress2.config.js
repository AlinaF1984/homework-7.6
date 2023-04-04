const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",

    viewportWidth: 740,
    viewportHeight: 360,
    retries: 1,
  },
});
