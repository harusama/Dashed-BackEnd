const BaseModel = require('./../../models/model');

class Subject extends BaseModel {
   static get tableName() {
      return 'subjects';
   }

   static get defaultEager() {
      return 'units.chapters.lessons';
   }

   static get relationMappings() {
      return {
         units: {
            relation: BaseModel.HasManyRelation,
            modelClass: __dirname + '/../unit/model.js',
            join: {
               from: 'subjects.id',
               to: 'units.subjectId'
            }
         },
         users: {
            relation: BaseModel.ManyToManyRelation,
            modelClass: __dirname + '/../user/model.js',
            join: {
               from: 'subjects.id',
               through: {
                  modelClass: __dirname + '/../user_subject/model.js',
                  from: 'users_subjects.subectId',
                  to: 'users_subjects.userId'
               },
               to: 'users.id'
            }
         }
      };
   }
}

module.exports = Subject;
