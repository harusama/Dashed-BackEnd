const { SHA256 } = require('crypto-js');
const BaseModel = require('./../../models/model');

class Hash extends BaseModel {
   static get tableName() {
      return 'hashes';
   }

   static get defaultEager() {
      return 'user';
   }

   static get relationMappings() {
      return {
         user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../user/model.js',
            join: {
               from: 'hashes.userId',
               to: 'users.id'
            }
         }
      };
   }

   static createHash() {
      const currentDate = new Date().toString();
      const random = Math.random().toString();
      return SHA256(currentDate + random).toString();
   }
}

module.exports = Hash;
