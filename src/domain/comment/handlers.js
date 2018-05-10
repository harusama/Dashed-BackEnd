/*
User can't create comment if do not have subject added

When new comment created, broadcast message to room subject name and send new comment
*/
const boom = require('boom');

async function createComment({ models, params, user, io }) {
   const { Comment } = models;
   const { newComment } = params;
   const attributes = {
      ...newComment.value,
      userId: user.id
   };
   const subjectFound = user.subjects.filter(subject => subject.id === attributes.subjectId);

   attributes.subjectId = undefined;

   if (subjectFound.length === 1) {
      const createdComment = await Comment.createOne({ attributes });
      sendPostMessage(io, subjectFound[0].name, { ...createdComment, username: user.username });
      return createdComment;
   } else {
      return Promise.reject(boom.badRequest('User do not have added current comment subject'));
   }
}

async function downvoteComment({ models, params }) {
   const { Comment } = models;
   const { commentId } = params;

   const commentFound = await Comment.getOneById({ id: commentId.value });

   if (commentFound.downvotes == 0) {
      return;
   }

   const data = {
      id: commentId.value,
      attributes: {
         downvotes: commentFound.downvotes - 1
      }
   };

   await Comment.patchOne(data);

   return;
}

async function upvoteComment({ models, params }) {
   const { Comment } = models;
   const { commentId } = params;

   const commentFound = await Comment.getOneById({ id: commentId.value });

   const data = {
      id: commentId.value,
      attributes: {
         upvotes: commentFound.upvotes + 1
      }
   };

   await Comment.patchOne(data);

   return;
}

function sendPostMessage(io, subjectName, comment) {
   io.to(subjectName).emit('newComment', comment);
}

module.exports = {
   createComment,
   downvoteComment,
   upvoteComment
};