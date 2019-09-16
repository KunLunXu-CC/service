const gulp = require('gulp');
const { createProKey } = require('./rsa');

module.exports = {
  createProKey,
  initDB: require('./initDB'),
  parseNotes: require('./parseNotes'),
  default: async () => {},
};
