function addSubjectToUser({ models, params }) {
   const { UserSubject } = models;
   const { userId, subjectId } = params;
   
   const attributes = {
      userId: userId.value,
      subjectId: subjectId.value
   }
   
   return UserSubject.createOne({ attributes });
}

module.exports = {
   addSubjectToUser
};