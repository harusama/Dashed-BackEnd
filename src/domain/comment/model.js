const BaseModel = require('./../../models/model');

class Comment extends BaseModel {
   static get tableName() {
      return 'comments';
   }

   static get relationMappings() {
      return {
         user: {
            relation: BaseModel.BelongsToOneRelation,
            modelClass: __dirname + '/../post/model.js',
            join: {
               from: 'comments.postId',
               to: 'posts.id'
            }
         }
      };
   }
}

module.exports = Comment;
