const BaseModel = require('./../../models/model');

class UserSubject extends BaseModel {
   static get tableName() {
      return 'users_subjects';
   }

   static get idColumn() {
      return 'user_id';
   }
}

module.exports = UserSubject;
