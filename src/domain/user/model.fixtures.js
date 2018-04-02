const User = require('./model.js');

const userWithRequiredAttributes = {
   firstName: 'John',
   lastName: 'Doe',
   username: 'john_doe_90',
   email: 'fer_fjsb2@hotmail.com',
   password: 'bc7b8851671f2fda237a53f5057a0376037b6d062e65f965c62aa1d047498759',
   campusId: 1
}

module.exports = {
   userWithRequiredAttributes,
   userWithRequiredAttributesAndAdminKind: () => {
      return User.createOne({
         attributes: {
            ...requiredAttributes,
            kind: User.kind.admin
         }
      });
   },
   userWithRequiredAttributesAndMaleGender: () => {
      return User.createOne({
         attributes: {
            ...requiredAttributes,
            gender: User.gender.male
         }
      });
   },
};