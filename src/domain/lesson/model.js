const BaseModel = require('./../../models/model');

class Lesson extends BaseModel {
   static get tableName() {
      return 'lessons';
   }

   static get defaultEager() {
      return 'chapter.unit';
   }

   static get relationMappings() {
      return {
         chapter: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../chapter/model.js',
            join: {
               from: 'lessons.chapterId',
               to: 'chapters.id'
            }
         }
      };
   }
}

module.exports = Lesson;
