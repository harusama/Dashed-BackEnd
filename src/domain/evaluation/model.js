const BaseModel = require('./../../models/model');

class Evaluation extends BaseModel {
   static get tableName() {
      return 'evaluations';
   }
}

module.exports = Evaluation;
