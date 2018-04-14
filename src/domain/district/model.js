const BaseModel = require('./../../models/model');

class District extends BaseModel {
   static get tableName() {
      return 'districts';
   }

   static get defaultEager() {
      return 'campus';
   }

   static get relationMappings() {
      return {
         campus: {
            relation: BaseModel.HasManyRelation,
            modelClass: __dirname + '/../campus/model.js',
            join: {
               from: 'districts.id',
               to: 'campus.districtId'
            }
         }
      };
   }
}

module.exports = District;
