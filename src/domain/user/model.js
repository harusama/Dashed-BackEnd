const jwt = require('jsonwebtoken');
const BaseModel = require('./../../models/model');
const UserSubject = require('./../user_subject/model');

class User extends BaseModel {
   static get tableName() {
      return 'users';
   }

   static get kind() {
      return {
         admin: 'admin',
         teacher: 'teacher'
      };
   }

   static get gender() {
      return {
         male: 'male',
         female: 'female',
         other: 'other'
      };
   }

   generateAuthToken() {
      return jwt.sign({ id: this.id }, 'secret').toString();
   }

   static incrementExperience(id, amount) {
      return this.query().where('id', id).increment('experience', amount).returning('experience');
   }

   static incrementCoins(id, amount) {
      return this.query().where('id', id).increment('coins', amount).returning('coins');
   }

   static async hasSubjectWithLessonId(userId, lessonId) {
      const attributes = { userId };
      const userSubjects = await UserSubject.getManyWith({ attributes });
      let hasSubject = false;

      userSubjects.forEach(userSubject => {
         userSubject.subject.units.forEach(unit => {
            unit.chapters.forEach(chapter => {
               chapter.lessons.forEach(lesson => {
                  if (lessonId === lesson.id) {
                     hasSubject = true;
                  }
               });
            });
         });
      });

      return hasSubject;
   }

   static get relationMappings() {
      return {
         subjects: {
            relation: BaseModel.ManyToManyRelation,
            modelClass: __dirname + '/../subject/model.js',
            join: {
               from: 'users.id',
               through: {
                  modelClass: __dirname + '/../user_subject/model.js',
                  from: 'users_subjects.userId',
                  to: 'users_subjects.subectId'
               },
               to: 'subjects.id'
            }
         }
      };
   }  
}

module.exports = User;
