function getSubjects({ models, params }) {
   const { Subject } = models;
   return Subject.getMany();
}

async function getSubjectById({ models, params }) {
   const { Subject, Post, News } = models;
   const { subjectId } = params;
   const posts = await Post.getManyWith({ attributes: { subjectId: subjectId.value } });
   const news = await News.getManyWith({ attributes: { subjectId: subjectId.value } });
   const subject = await Subject.getOneById({ id: subjectId.value });

   const filteredPosts = posts.map(post => ({
      ...post,
      username: post.user.username,
      user: undefined,
      subjectId: undefined
   }));

   return {
      posts: filteredPosts,
      news,
      units: subject.units
   };
}

module.exports = {
   getSubjects,
   getSubjectById
};