const request = require('supertest');
const { app } = require('./../../app');
const { SHA256 } = require('crypto-js');
const { truncateDomainTables } = require('./../../db');
const fixtures = require('./model.fixtures.js');

const { User, Hash } = app.locals.models;
const basePath = '/v1/users'

afterEach(() => {
   return truncateDomainTables();
});

describe(`POST ${basePath}/login`, () => {
   const path = `${basePath}/login`;

   test('login existing user with validated email and return auth header', async done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         password: SHA256(fixtures.userWithRequiredAttributes.password).toString(),
         active: true
      };

      try {
         await User.createOne({ attributes: userData });
         request(app)
            .post(path)
            .send(fixtures.userLogin)
            .expect(201)
            .expect(res => {
               expect(res.headers['x-auth']).toBeTruthy();
            })
            .end(done);
      } catch (e) {
         done(err);
      }
   })

   test('not login existing user without validated email', async done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         password: SHA256(fixtures.userWithRequiredAttributes.password).toString()
      };

      try {
         await User.createOne({ attributes: userData });
         request(app)
            .post(path)
            .send(fixtures.userLogin)
            .expect(400)
            .end(done);
      } catch (e) {
         done(err);
      }
   });

   test('not login non-existing user', done => {
      const nonExistingUser = {
         email: 'nonexisting@user.com',
         password: 'mypass'
      };

      request(app).post(path).send(nonExistingUser).expect(404).end(done);
   });

   test('bad request login without email sent', done => {
      const nonExistingUser = { password: 'mypass' };

      request(app).post(path).send(nonExistingUser).expect(400).end(done);
   });

   test('bad request login without password sent', done => {
      const nonExistingUser = { email: 'nonexisting@user.com' };

      request(app).post(path).send(nonExistingUser).expect(400).end(done);
   });

   test('bad request login without email and password sent', done => {
      const nonExistingUser = {};

      request(app).post(path).send(nonExistingUser).expect(400).end(done);
   });
});

describe(`POST ${basePath}/signup`, () => {
   const path = `${basePath}/signup`;

   test('create a user with required attributes', done => {
      request(app)
         .post(path)
         .send(fixtures.userWithRequiredAttributes)
         .expect(201)
         .expect(res => {
            expect(res.body).toBe('');
         })
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               fixtures.userWithRequiredAttributes.password = SHA256(fixtures.userWithRequiredAttributes.password).toString();
               expect(users.length).toBe(1);
               expect(users[0]).toMatchObject(fixtures.userWithRequiredAttributes);
               expect(users[0].active).toBe(false);
               expect(users[0].kind).toBe(User.kind.teacher);
               expect(users[0].gender).toBe(User.gender.other);

               const attributes = { userId: users[0].id };
               await Hash.getOne({ attributes });
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               fixtures.userWithRequiredAttributes.password = SHA256(fixtures.userWithRequiredAttributes.password).toString();
               expect(users.length).toBe(1);
               expect(users[0]).toMatchObject(fixtures.userWithRequiredAttributes);
               expect(users[0].active).toBe(false);
               expect(users[0].kind).toBe(User.kind.teacher);
               expect(users[0].gender).toBe(User.gender.other);

               const attributes = { userId: users[0].id };
               await Hash.getOne({ attributes });
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               userData.password = SHA256(userData.password).toString();
               expect(users.length).toBe(1);
               expect(users[0]).toMatchObject(userData);
               expect(users[0].active).toBe(false);
               expect(users[0].kind).toBe(User.kind.admin);
               expect(users[0].gender).toBe(User.gender.other);

               const attributes = { userId: users[0].id };
               await Hash.getOne({ attributes });
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               userData.password = SHA256(userData.password).toString();
               expect(users.length).toBe(1);
               expect(users[0]).toMatchObject(userData);
               expect(users[0].active).toBe(false);
               expect(users[0].kind).toBe(User.kind.teacher);
               expect(users[0].gender).toBe(User.gender.female);
               
               const attributes = { userId: users[0].id };
               await Hash.getOne({ attributes });
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               expect(users.length).toBe(0);
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               expect(users.length).toBe(0);
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               expect(users.length).toBe(0);
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               expect(users.length).toBe(0);
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               expect(users.length).toBe(0);
               done();
            } catch (e) {
               done(e);
            }
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
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               expect(users.length).toBe(0);
               done();
            } catch (e) {
               done(e);
            }
         });
   });

   test('not create a user with empty data sent', done => {
      const userData = {};

      request(app)
         .post(path)
         .send(userData)
         .expect(400)
         .end(async (err, res) => {
            if (err) {
               return done(err);
            }

            try {
               const users = await User.getMany();
               expect(users.length).toBe(0);
               done();
            } catch (e) {
               done(e);
            }
         });
   });
});

describe(`GET ${basePath}/signup/verify?id`, () => {
   const path = `${basePath}/signup/verify`;

   test('verify a user already signed up', async done => {
      const userData = {
         ...fixtures.userWithRequiredAttributes,
         password: SHA256(fixtures.userWithRequiredAttributes.password).toString()
      };

      try {
         const user = await User.createOne({ attributes: userData });
         expect(user.active).toBe(false);

         const hashData = {
            hash: Hash.createHash(),
            userId: user.id
         }
         const hash = await Hash.createOne({ attributes: hashData });

         request(app)
            .get(`${path}?id=${hash.hash}`)
            .expect(200)
            .end(async (err, res) => {
               if (err) {
                  return done(err);
               }

               try {
                  const users = await User.getMany();
                  expect(users.length).toBe(1);
                  expect(users[0].active).toBe(true);

                  const hash = await Hash.getMany();
                  expect(hash.length).toBe(0);
                  done();
               } catch (e) {
                  done(e);
               }
            });
      } catch (e) {
         done(err);
      }
   });

   test('verify with a non-existing hash', done => {
      request(app).get(`${path}?id=123`).expect(404).end(done);
   });
});