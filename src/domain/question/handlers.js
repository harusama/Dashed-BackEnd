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

function approveQuestion({ models, params }) {
   const { Question } = models;
   const { questionId } = params;

   return Question.incrementApprovedWithId(questionId.value);
}

module.exports = {
   createQuestion,
   getNotApprovedQuestionsBySubjectId,
   approveQuestion
};