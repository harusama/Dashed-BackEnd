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

   static get relationMappings() {
      return {
         subjects: {
            relation: BaseModel.ManyToManyRelation,
            modelClass: __dirname + '/../subject/model.js',
            join: {
               from: 'users.id',
               through: {
                  modelClass: __dirname + '/../user_subject/model.js',
                  from: 'users_subjects.userId',
                  to: 'users_subjects.subectId'
               },
               to: 'subjects.id'
            }
         }
      };
   }  
}

module.exports = User;
