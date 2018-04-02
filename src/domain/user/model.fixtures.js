const User = require('./model.js');

const userWithRequiredAttributes = {
   firstName: 'John',
   lastName: 'Doe',
   username: 'john_doe_90',
   email: 'fer_fjsb2@hotmail.com',
   password: '23',
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