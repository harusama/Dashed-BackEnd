const BaseModel = require('./../../models/model');

class Answer extends BaseModel {
   static get tableName() {
      return 'answers';
   }

   static get defaultEager() {
      return 'question';
   }

   static get relationMappings() {
      return {
         question: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../question/model.js',
            join: {
               from: 'answers.questionId',
               to: 'questions.id'
            }
         }
      };
   }
}

module.exports = Answer;
