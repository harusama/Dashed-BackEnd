const BaseModel = require('./../../models/model');

class Chapter extends BaseModel {
   static get tableName() {
      return 'chapters';
   }

   static get defaultEager() {
      return 'lessons';
   }

   static get relationMappings() {
      return {
         lessons: {
            relation: BaseModel.HasManyRelation,
            modelClass: __dirname + '/../lesson/model.js',
            join: {
               from: 'chapters.id',
               to: 'lessons.chapterId'
            }
         },
         unit: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../unit/model.js',
            join: {
               from: 'chapters.unitId',
               to: 'units.id'
            }
         }
      };
   }
}

module.exports = Chapter;
