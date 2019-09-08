const gulp = require('gulp');

module.exports = {
  initDB: require('./initDB'),
  parseNotes: require('./parseNotes'),
  default: async () => {},
};
