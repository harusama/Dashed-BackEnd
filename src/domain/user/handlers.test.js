const request = require('supertest');
const { app } = require('./../../app');
const { truncateDomainTables } = require('./../../db');
const fixtures = require('./model.fixtures.js');
const path = '/v1/users/signup';

const { User, Hash } = app.locals.models;

afterEach(() => {
   return truncateDomainTables();
});

describe(`POST ${path}`, () => {
   test('create a user with required attributes', done => {
      request(app)
         .post(path)
         .send(fixtures.userWithRequiredAttributes)
         .expect(201)
         .expect(res => {
            expect(res.body).toBe('');
         })
         .end((err, res) => {
            if (err) {
               return done(err);
            }

            User.getMany().then(users => {
               expect(users.length).toBe(1);
               expect(users[0]).toMatchObject(fixtures.userWithRequiredAttributes);
               expect(users[0].active).toBe(false);
               expect(users[0].kind).toBe(User.kind.teacher);
               expect(users[0].gender).toBe(User.gender.other);
               const attributes = { userId: users[0].id };
               return Hash.getOne({ attributes });
            }).then(hash => {
               done();
            }).catch(err => done(err));
         });
   });
});