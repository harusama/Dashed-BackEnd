const BaseModel = require('./../../models/model');
const Region = require('./../region/model');

class State extends BaseModel {
   static get tableName() {
      return 'states';
   }

   static get defaultEager() {
      return 'regions.districts.campus';
   }

   static get relationMappings() {
      return {
         regions: {
            relation: BaseModel.HasManyRelation,
            modelClass: __dirname + '/../region/model.js',
            join: {
               from: 'states.id',
               to: 'regions.stateId'
            }
         }
      };
   }
}

module.exports = State;
