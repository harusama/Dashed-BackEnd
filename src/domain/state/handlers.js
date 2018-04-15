function getStates({ models, params }) {
   const { State } = models;
   return State.getMany();
}

module.exports = {
   getStates
};