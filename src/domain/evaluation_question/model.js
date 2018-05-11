const BaseModel = require('./../../models/model');

class EvaluationQuestion extends BaseModel {
   static get tableName() {
      return 'evaluation_questions';
   }
}

module.exports = EvaluationQuestion;
