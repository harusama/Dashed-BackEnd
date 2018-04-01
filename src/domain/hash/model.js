const BaseModel = require('./../../models/model');

class Hash extends BaseModel {
   static get tableName() {
      return 'hashes';
   }
}

module.exports = Hash;
