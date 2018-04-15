const boom = require('boom');

function addSubjectToUser({ models, params, user }) {
   const { UserSubject } = models;
   const { userId, subjectId } = params;

   if (userId.value !== user.id) {
      return Promise.reject(boom.badRequest('userId do not match with jwt user id'));
   }
   
   const attributes = {
      userId: userId.value,
      subjectId: subjectId.value
   }
   
   return UserSubject.createOne({ attributes }).then(() => {
      return '';
   });
}

module.exports = {
   addSubjectToUser
};