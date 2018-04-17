const BaseModel = require('./../../models/model');

class News extends BaseModel {
   static get tableName() {
      return 'news';
   }

   static get relationMappings() {
      return {
         user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../subject/model.js',
            join: {
               from: 'news.subject_id',
               to: 'subjects.id'
            }
         }
      };
   }
}

module.exports = News;
