function getSubjects({ models, params }) {
   const { Subject } = models;
   return Subject.getMany();
}

module.exports = {
   getSubjects
};