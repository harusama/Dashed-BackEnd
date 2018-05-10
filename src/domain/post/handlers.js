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
      sendPostMessage(io, subjectFound[0].name, { ...createdPost, username: user.username });
      return createdPost;
   } else {
      return Promise.reject(boom.badRequest('User do not have added current post subject'));
   }
}

async function downvotePost({ models, params }) {
   const { Post } = models;
   const { postId } = params;

   const postFound = await Post.getOneById({ id: postId.value });
   
   if (postFound.downvotes == 0) {
      return;
   }

   const data = {
      id: postId.value,
      attributes: {
         downvotes: postFound.downvotes - 1
      }
   };

   await Post.patchOne(data);

   return;
}

async function upvotePost({ models, params }) {
   const { Post } = models;
   const { postId } = params;

   const postFound = await Post.getOneById({ id: postId.value });

   const data = {
      id: postId.value,
      attributes: {
         upvotes: postFound.upvotes + 1
      }
   };

   await Post.patchOne(data);

   return;
}

async function getTestimonies({ models, params}) {
   const { Post } = models;
   const attributes = {
      kind: Post.kind.testimony
   };

   const testimonies = await Post.getManyWith({ attributes }).map(testimony => {
      return {
         ...testimony,
         username: testimony.user.username,
         user: undefined,
         kind: undefined,
         downvotes: undefined,
         upvotes: undefined,
         comments: undefined
      }
   });

   return testimonies;
}

function sendPostMessage(io, subjectName, post) {
   io.to(subjectName).emit('newPost', post);
}

module.exports = {
   createPost,
   downvotePost,
   upvotePost,
   getTestimonies
};