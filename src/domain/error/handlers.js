const boom = require('boom');

async function createError({ models, params, user }) {
   const { Error, Question } = models;
   const { newError } = params;
   newError.value.userId = user.id;

   if (newError.value.kind === Error.kind.system) {
      newError.value.questionId = undefined;
      await Error.createOne({ attributes: newError.value });
   } else if (newError.value.questionId) {
      await Question.getOneById({ id: newError.value.questionId });
      await Error.createOne({ attributes: newError.value });
   } else {
      return Promise.reject(boom.badRequest('questionId is undefined'));
   }

   return;
}

module.exports = {
   createError
};