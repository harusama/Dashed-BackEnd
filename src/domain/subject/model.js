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
         }
      };
   }
}

module.exports = Subject;
