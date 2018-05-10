async function getGeneralNews({ models }) {
   const { News } = models;
   const attributes = {
      subjectId: null,
      stateId: null,
      regionId: null,
      districtId: null,
   };
   const generalNews = await News.getManyWith({ attributes });
   
   return generalNews;
}

module.exports = {
   getGeneralNews
};