const gulp = require('gulp');

module.exports.initDB = require('./initDB');
module.exports.parseNotes = require('./parseNotes');

exports.default = async () => {
  console.log('===>>> default');
}
