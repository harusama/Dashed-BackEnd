function createQuestion({ models, params, userId }) {
   const { Question } = models;
   const { newQuestion } = params;
   newQuestion.value.userId = userId
   
   return Question.createOne({ attributes: newQuestion.value });
}

module.exports = {
   createQuestion
};