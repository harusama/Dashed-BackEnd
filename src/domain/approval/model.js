const BaseModel = require('./../../models/model');

class Approval extends BaseModel {
   static get tableName() {
      return 'approvals';
   }
}

module.exports = Approval;
