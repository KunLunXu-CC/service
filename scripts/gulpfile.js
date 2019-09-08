const gulp = require('gulp');

module.exports = {
  ...require('./deploy'),
  initDB: require('./initDB'),
  parseNotes: require('./parseNotes'),
  default: async () => {},
};
