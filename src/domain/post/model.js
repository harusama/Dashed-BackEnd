const BaseModel = require('./../../models/model');

class Post extends BaseModel {
   static get tableName() {
      return 'posts';
   }

   static get relationMappings() {
      return {
         user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../user/model.js',
            join: {
               from: 'posts.userId',
               to: 'users.id'
            }
         }
      };
   }
}

module.exports = Post;
