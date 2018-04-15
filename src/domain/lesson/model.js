const BaseModel = require('./../../models/model');

class Lesson extends BaseModel {
   static get tableName() {
      return 'lessons';
   }
}

module.exports = Lesson;
