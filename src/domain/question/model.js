const BaseModel = require('./../../models/model');

class Question extends BaseModel {
   static get tableName() {
      return 'questions';
   }

   static get defaultEager() {
      return 'answers';
   }

   static getManyBySubjectId(subjectId) {
      return this.query().eager(this.defaultEager).where('subjectId', subjectId).then(questions => {
         return questions.map(question => {
            const answers = question.answers.map(answer => ({
               ...answer, 
               id: undefined,
               questionId: undefined,
            }));

            return {
               ...question,
               answers
            };
         });
      });
   }

   static incrementApprovedWithId(id) {
      return this.query().where('id', id).increment('approved', 1);
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
