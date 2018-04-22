const BaseModel = require('./../../models/model');

class Post extends BaseModel {
   static get tableName() {
      return 'posts';
   }

   static get defaultEager() {
      return '[user, comments.user]';
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
         },
         comments: {
            relation: BaseModel.HasManyRelation,
            modelClass: __dirname + '/../comment/model.js',
            join: {
               from: 'posts.id',
               to: 'comments.postId'
            }
         }
      };
   }
}

module.exports = Post;
