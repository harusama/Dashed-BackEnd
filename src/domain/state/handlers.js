async function getStates({ models, params }) {
   console.log('getStates');
   const { State } = models;

   return State.getMany();
}

module.exports = {
   getStates
};