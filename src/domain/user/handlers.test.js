const request = require('supertest');
const { app } = require('./../../app');

const path = '/v1/users';

describe(`POST ${path}`, () => {
   test('create a user with all attributes', done => {
      request(app)
         .get('/v1/')
         .expect(200)
         .expect(res => {
            expect(res.body.data.text).toBe('Hello Dash-ed REST API!');
         })
         .end(done);
      // request(app)
      //    .post(path)
      //    .expect(201)
      //    .expect(res => {
      //       expect(res.body).toBe('');
      //    })
      //    .end(done);
   });
});