const jwt = require('jsonwebtoken');
const BaseModel = require('./../../models/model');

class User extends BaseModel {
   static get tableName() {
      return 'users';
   }

   static get kind() {
      return {
         admin: 'admin',
         teacher: 'teacher'
      };
   }

   static get gender() {
      return {
         male: 'male',
         female: 'female',
         other: 'other'
      };
   }

   generateAuthToken() {
      return jwt.sign({ id: this.id }, 'secret').toString();
   }
}

module.exports = User;
