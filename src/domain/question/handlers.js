const boom = require('boom');

async function createQuestion({ models, params, user }) {
   const { User, Question, UserSubject } = models;
   const { newQuestion } = params;
   newQuestion.value.userId = user.id

   const hasSubjectWithLessonId = await User.hasSubjectWithLessonId(user.id, newQuestion.value.lessonId);
   
   if (hasSubjectWithLessonId) {
      const result = Question.createOne({ attributes: newQuestion.value });
      await User.incrementExperience(user.id, 250);
      await User.incrementCoins(user.id, 1);
      return result;
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

   if (question.id === user.id) {
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

async function getEvaluationQuestionsForQuestionId({ models, params }) {
   const { Question, EvaluationQuestion } = models;
   const { questionId } = params;

   const question = await Question.getOneById({ id: questionId.value });

   const evaluations = await EvaluationQuestion.query().where('kind', question.kind).orWhere('kind', null).map(evaluation => {
      return {
         ...evaluation,
         createdAt: undefined,
         kind: undefined
      };
   });

   return evaluations;
}

async function addEvaluationForQuestionId({ models, params, user }) {
   const { Question, Evaluation } = models;
   const { questionId, newEvaluation } = params;

   const question = await Question.getOneById({ id: questionId.value });

   if (question.id === user.id) {
      console.log('This user created this question.');
      return '';
   }
   
   const attributes = newEvaluation.value.map(evaluation => {
      return {
         score: evaluation.score,
         questionId: questionId.value,
         userId: user.id,
         evaluationQuestionId: evaluation.evaluationQuestionId,
      };
   });
   
   await Evaluation.createOne({ attributes });
   
   return;
}

async function rejectQuestion({ models, params, user }) {
   const { Question, Approval, Rejection } = models;
   const { questionId, newRejection } = params;
   
   const attributes = {
      questionId: questionId.value,
      userId: user.id
   };

   const question = await Question.getOneById({ id: questionId.value });

   if (question.id === user.id) {
      console.log('This user created this question.');
      return '';
   }

   const rejectionsForQuestion = await Rejection.getManyWith({ attributes });

   if (rejectionsForQuestion.length !== 0) {
      console.log('This user already rejected this question.');
      return '';
   }

   attributes.description = newRejection.value.description;
   await Rejection.createOne({ attributes });

   return '';
}

module.exports = {
   createQuestion,
   getNotApprovedQuestionsBySubjectId,
   approveQuestion,
   getEvaluationQuestionsForQuestionId,
   addEvaluationForQuestionId,
   rejectQuestion
};