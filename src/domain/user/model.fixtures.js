const User = require('./model.js');

const email = 'fer_fjsb2@hotmail.com';
const password = 'bc7b8851671f2fda237a53f5057a0376037b6d062e65f965c62aa1d047498759';

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