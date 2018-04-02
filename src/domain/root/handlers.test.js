const request = require('supertest');
const { app } = require('./../../app');

describe('Root', () => {
   test('it should send hello world', done => {
      request(app)
         .get('/v1/')
         .expect(200)
         .expect(res => {
            expect(res.body.data.text).toBe('Hello Dash-ed REST API!');
         })
         .end(done);
   });
});