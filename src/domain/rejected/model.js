const BaseModel = require('./../../models/model');

class Rejection extends BaseModel {
   static get tableName() {
      return 'rejections';
   }
}

module.exports = Rejection;
