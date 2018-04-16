/*
User can't create post if do no have subject added

When new post created, broadcast message to room subject name and send new post
*/
const boom = require('boom');

async function createPost({ models, params, user, io }) {
   const { Post } = models;
   const { newPost } = params;
   const attributes = {
      ...newPost.value,
      userId: user.id
   };

   const subjectFound = user.subjects.filter(subject => subject.id === attributes.subjectId);
   
   if (subjectFound.length === 1) {
      const createdPost = await Post.createOne({ attributes });
      sendPostMessage(io, subjectFound.name, createdPost);
      return createdPost;
   } else {
      return Promise.reject(boom.badRequest('User do not have added current post subject'));
   }
}

function sendPostMessage(io, subjectName, post) {
   io.to('Subject1').emit('newPost', post);
}

module.exports = {
   createPost
};