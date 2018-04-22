const boom = require('boom');

async function createQuestion({ models, params, user }) {
   const { User, Question, UserSubject } = models;
   const { newQuestion } = params;
   newQuestion.value.userId = user.id

   const hasSubjectWithLessonId = await User.hasSubjectWithLessonId(user.id, newQuestion.value.lessonId);
   
   if (hasSubjectWithLessonId) {
      return Question.createOne({ attributes: newQuestion.value });
   } else {
      return Promise.reject(boom.badRequest('User do not have added current post subject'));
   }
}

async function getNotApprovedQuestionsBySubjectId({ models, params }) {
   const { Question } = models;
   const { subjectId } = params;

   return await Question.getManyApprovedBySubjectId(subjectId.value, false);
}

async function approveQuestion({ models, params, user }) {
   const { Question, Approval } = models;
   const { questionId } = params;
   const attributes = {
      questionId: questionId.value,
      userId: user.id
   };
   
   const question = await Question.getOneById({ id: questionId.value });
   console.log('question', question);

   if (question.userId === user.id) {
      console.log('This user created this question.');
      return '';
   }

   const approvalsForQuestion = await Approval.getManyWith({ attributes });

   if (approvalsForQuestion.length !== 0) {
      console.log('This user already approved this question.');
      return '';
   }

   await Approval.createOne({ attributes });
   const questionUpdated = await Question.incrementApprovedWithId(questionId.value);

   if (questionUpdated[0].approvedTimes >= Question.approvedTimes) {
      try {
         await Question.patchOne({ 
            id: attributes.questionId,
            attributes: {
               approved: true
            }
         });
      } catch (e) {
      }
   }

   return '';
}

module.exports = {
   createQuestion,
   getNotApprovedQuestionsBySubjectId,
   approveQuestion
};