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
   }, 10000);

   test('create a user with required attributes and admin kind', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         kind: User.kind.admin
      };
      request(app)
         .post(path)
         .send(userData)
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
               expect(users[0]).toMatchObject(userData);
               expect(users[0].active).toBe(false);
               expect(users[0].kind).toBe(User.kind.admin);
               expect(users[0].gender).toBe(User.gender.other);
               const attributes = { userId: users[0].id };
               return Hash.getOne({ attributes });
            }).then(hash => {
               done();
            }).catch(err => done(err));
         });
   }, 10000);

   test('create a user with required attributes and female gender', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         gender: User.gender.female
      };
      request(app)
         .post(path)
         .send(userData)
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
               expect(users[0]).toMatchObject(userData);
               expect(users[0].active).toBe(false);
               expect(users[0].kind).toBe(User.kind.teacher);
               expect(users[0].gender).toBe(User.gender.female);
               const attributes = { userId: users[0].id };
               return Hash.getOne({ attributes });
            }).then(hash => {
               done();
            }).catch(err => done(err));
         });
   }, 10000);

   test('not create a user without firstName', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         firstName: undefined
      };
      request(app)
         .post(path)
         .send(userData)
         .expect(400)
         .end((err, res) => {
            if (err) {
               return done(err);
            }

            User.getMany().then(users => {
               expect(users.length).toBe(0);
               done();
            }).catch(err => done(err));
         });
   });

   test('not create a user without lastName', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         lastName: undefined
      };
      request(app)
         .post(path)
         .send(userData)
         .expect(400)
         .end((err, res) => {
            if (err) {
               return done(err);
            }

            User.getMany().then(users => {
               expect(users.length).toBe(0);
               done();
            }).catch(err => done(err));
         });
   });

   test('not create a user without username', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         username: undefined
      };
      request(app)
         .post(path)
         .send(userData)
         .expect(400)
         .end((err, res) => {
            if (err) {
               return done(err);
            }

            User.getMany().then(users => {
               expect(users.length).toBe(0);
               done();
            }).catch(err => done(err));
         });
   });

   test('not create a user without email', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         email: undefined
      };
      request(app)
         .post(path)
         .send(userData)
         .expect(400)
         .end((err, res) => {
            if (err) {
               return done(err);
            }

            User.getMany().then(users => {
               expect(users.length).toBe(0);
               done();
            }).catch(err => done(err));
         });
   });

   test('not create a user without password', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         password: undefined
      };
      request(app)
         .post(path)
         .send(userData)
         .expect(400)
         .end((err, res) => {
            if (err) {
               return done(err);
            }

            User.getMany().then(users => {
               expect(users.length).toBe(0);
               done();
            }).catch(err => done(err));
         });
   });

   test('not create a user without campusId', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         campusId: undefined
      };
      request(app)
         .post(path)
         .send(userData)
         .expect(400)
         .end((err, res) => {
            if (err) {
               return done(err);
            }

            User.getMany().then(users => {
               expect(users.length).toBe(0);
               done();
            }).catch(err => done(err));
         });
   });
});