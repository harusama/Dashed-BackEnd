const BaseModel = require('./../../models/model');

class Comment extends BaseModel {
   static get tableName() {
      return 'comments';
   }

   static get relationMappings() {
      return {
         post: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../post/model.js',
            join: {
               from: 'comments.postId',
               to: 'posts.id'
            }
         },
         user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../user/model.js',
            join: {
               from: 'comments.userId',
               to: 'users.id'
            }
         }
      };
   }
}

module.exports = Comment;
