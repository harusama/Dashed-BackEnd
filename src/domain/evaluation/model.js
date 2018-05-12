const BaseModel = require('./../../models/model');

class Evaluation extends BaseModel {
   static get tableName() {
      return 'evaluations';
   }

   static get defaultEager() {
      return '[question.answers, evaluationQuestion]';
   }

   static get relationMappings() {
      return {
         question: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../question/model.js',
            join: {
               from: 'evaluations.questionId',
               to: 'questions.id'
            }
         },
         evaluationQuestion: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../evaluation_question/model.js',
            join: {
               from: 'evaluations.evaluationQuestionId',
               to: 'evaluation_questions.id'
            }
         }
      };
   }
}

module.exports = Evaluation;
