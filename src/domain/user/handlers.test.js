const request = require('supertest');
const { app } = require('./../../app');
const { truncateDomainTables } = require('./../../db');
const fixtures = require('./model.fixtures.js');

const { User, Hash } = app.locals.models;
const basePath = '/v1/users'

afterEach(() => {
   return truncateDomainTables();
});

describe(`POST ${basePath}`, () => {
   const path = '/v1/users';

   test('login existing user with validated email', done => {
      User.createOne({ attributes: fixtures.userWithRequiredAttributes }).then(user => {
         return User.getOne({ attributes: fixtures.userWithRequiredAttributes}); 
      }).then(userCreated => {
         return User.patchOne({ id: userCreated.id, attributes: { active: true }})
      }).then(() => {
         request(app)
            .post(path)
            .send(fixtures.userLogin)
            .expect(201)
            .end(done);
      }).catch(done);
   })

   test('not login existing user without validated email', done => {
      User.createOne({ attributes: fixtures.userWithRequiredAttributes }).then(user => {
         request(app)
            .post(path)
            .send(fixtures.userLogin)
            .expect(400)
            .end(done);
      }).catch(err => done(err));
   });

   test('not login non-existing user', done => {
      const nonExistingUser = {
         email: 'nonexisting@user.com',
         password: 'mypass'
      };

      request(app).post(path).send(nonExistingUser).expect(404).end(done);
   });

   test('bad request login without email sent', done => {
      const nonExistingUser = {
         password: 'mypass'
      };

      request(app).post(path).send(nonExistingUser).expect(400).end(done);
   });

   test('bad request login without password sent', done => {
      const nonExistingUser = {
         email: 'nonexisting@user.com',
      };

      request(app).post(path).send(nonExistingUser).expect(400).end(done);
   });

   test('bad request login without email and password sent', done => {
      const nonExistingUser = {};

      request(app).post(path).send(nonExistingUser).expect(400).end(done);
   });
});

describe(`POST ${basePath}/signup`, () => {
   const path = '/v1/users/signup';

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

   test('create a user with required attributes and active set to true sent', done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         active: true
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
   });

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
   });

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

   test('not create a user with empty data sent', done => {
      const userData = {};
      
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