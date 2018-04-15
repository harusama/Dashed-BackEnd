const BaseModel = require('./../../models/model');

class Unit extends BaseModel {
   static get tableName() {
      return 'units';
   }

   static get defaultEager() {
      return 'chapters';
   }

   static get relationMappings() {
      return {
         chapters: {
            relation: BaseModel.HasManyRelation,
            modelClass: __dirname + '/../chapter/model.js',
            join: {
               from: 'units.id',
               to: 'chapters.unitId'
            }
         }
      };
   }
}

module.exports = Unit;
