const fs = require('fs');
const path = require('path');
const { createRasKey } = require('../../utils/encryption');

module.exports.createProKey = async () => {
  console.log(createRasKey());
}
