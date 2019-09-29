const fs = require('fs');
const {getList, create, remove, update } = require('../../service/common');
const { creator, updater } = require('./fragment');

module.exports = {
  Query: {

  },

  Mutation: {

  },
  
  Photo: {
    creator, 
    updater,
  }
}
