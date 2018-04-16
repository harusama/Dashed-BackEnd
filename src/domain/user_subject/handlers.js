const boom = require('boom');

function addSubjectToUser({ models, params, user }) {
   const { UserSubject } = models;
   const { subjectId } = params;
   
   const attributes = {
      userId: user.id,
      subjectId: subjectId.value
   }
   
   return UserSubject.createOne({ attributes }).then(() => {
      return '';
   });
}

module.exports = {
   addSubjectToUser
};