const BaseModel = require('./../../models/model');

class Question extends BaseModel {
   static get tableName() {
      return 'questions';
   }

   static get defaultEager() {
      return '[lesson.chapter.unit, answers]';
   }

   static get defaultOmit() {
      return ['createdAt'];
   }

   static async getManyApprovedBySubjectId(subjectId, approved) {
      let questionsNotApproved = await this.query()
         .eager('[lesson.chapter.unit(filterBySubjectId), answers, user]', {
            filterBySubjectId: builder => {
               builder.where('subjectId', subjectId);
            }
         })
         .where('approved', approved)
         .omit(this.defaultOmit);

      questionsNotApproved = questionsNotApproved.filter(question => question.lesson.chapter.unit ? true : false);
      return questionsNotApproved.map(question => {
         return {
            ...question,
            lessonId: undefined,
            lesson: undefined,
            username: question.user.username,
            user: undefined
         };
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
         lesson: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../lesson/model.js',
            join: {
               from: 'questions.lessonId',
               to: 'lessons.id'
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
