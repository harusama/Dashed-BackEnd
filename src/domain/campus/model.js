const BaseModel = require('./../../models/model');

class Campus extends BaseModel {
   static get tableName() {
      return 'campus';
   }
}

module.exports = Campus;
