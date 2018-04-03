function createQuestion({ models, params, userId }) {
   const { Question } = models;
   const { newQuestion } = params;
   newQuestion.value.userId = userId
   
   return Question.createOne({ attributes: newQuestion.value });
}

function getQuestionsBySubjectId({ models, params }) {
   const { Question } = models;
   const { subjectId } = params;

   return Question.getManyBySubjectId(subjectId.value);;
}

function approveQuestion({ models, params }) {
   const { Question } = models;
   const { questionId } = params;

   return Question.incrementApprovedWithId(questionId.value);
}

module.exports = {
   createQuestion,
   getQuestionsBySubjectId,
   approveQuestion
};