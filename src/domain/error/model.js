const BaseModel = require('./../../models/model');

class Error extends BaseModel {
   static get tableName() {
      return 'errors';
   }

   static get kind() {
      return {
         system: 'system',
         question: 'question'
      };
   }

   static get relationMappings() {
      return {
         question: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../question/model.js',
            join: {
               from: 'errors.questionId',
               to: 'questions.id'
            }
         },
         user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../user/model.js',
            join: {
               from: 'errors.userId',
               to: 'users.id'
            }
         }
      };
   }
}

module.exports = Error;
