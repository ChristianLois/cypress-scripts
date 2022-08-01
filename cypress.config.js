const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://52.76.214.142/',
    reporter: 'mochawesome',
    reporterOptions: {
      overwrite: false,
      html: false,
      json: true
    }
  },
});
