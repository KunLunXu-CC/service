const gulp = require('gulp');

module.exports = {
  ...require('./rsa'),
  initDB: require('./initDB'),
  parseNotes: require('./parseNotes'),
  default: async () => {},
};
