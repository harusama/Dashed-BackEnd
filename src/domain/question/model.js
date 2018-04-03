const BaseModel = require('./../../models/model');

class Question extends BaseModel {
   static get tableName() {
      return 'questions';
   }

   static get defaultEager() {
      return ['user', 'answers'];
   }

   static get relationMappings() {
      return {
         user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../user/model.js',
            join: {
               from: 'questions.userId',
               to: 'users.id'
            }
         },
         answers: {
            relation: BaseModel.HasManyRelation,
            modelClass: __dirname + '/../answer/model.js',
            join: {
               from: 'questions.id',
               to: 'answers.questionId'
            }
         }
      };
   }
}

module.exports = Question;
