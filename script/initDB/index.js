const path = require('path');
const shell = require('shelljs');

const db = require('./db.js');
const mongo = require('../../utils/mongo');

const mongoDB = mongo(path.resolve(__dirname, '../../models'));

// mongoDB.Role.remove({}).then(res => {
//   console.log(res);
// });

mongoDB.Role.find().then(res => {
  console.log(res);
  shell.exit();
});
