const BaseModel = require('./../../models/model');

class Region extends BaseModel {
   static get tableName() {
      return 'regions';
   }

   static get defaultEager() {
      return 'districts';
   }

   static get relationMappings() {
      return {
         districts: {
            relation: BaseModel.HasManyRelation,
            modelClass: __dirname + '/../district/model.js',
            join: {
               from: 'regions.id',
               to: 'districts.regionId'
            }
         }
      };
   }
}

module.exports = Region;
