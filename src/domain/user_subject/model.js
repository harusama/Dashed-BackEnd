const BaseModel = require('./../../models/model');

class UserSubject extends BaseModel {
   static get tableName() {
      return 'users_subjects';
   }

   static get defaultEager() {
      return 'subject';
   }

   static get idColumn() {
      return 'user_id';
   }

   static get relationMappings() {
      return {
         subject: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../subject/model.js',
            join: {
               from: 'users_subjects.subjectId',
               to: 'subjects.id'
            }
         }
      };
   }
}

module.exports = UserSubject;
