const gulp = require('gulp');

module.exports.initDB = require('./initDB');

exports.default = async () => {
  console.log('===>>> default');
}
