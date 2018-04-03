const User = require('./model.js');

const email = 'fer_fjsb2@hotmail.com';
const password = 'MyPass123';

const userWithRequiredAttributes = {
   firstName: 'John',
   lastName: 'Doe',
   username: 'john_doe_90',
   email,
   password,
   campusId: 1
}

const userLogin = {
   email,
   password
};

module.exports = {
   userWithRequiredAttributes,
   userLogin
};