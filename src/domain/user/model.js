const BaseModel = require('./../../models/model');

class User extends BaseModel {
   static get tableName() {
      return 'users';
   }
}

module.exports = User;
