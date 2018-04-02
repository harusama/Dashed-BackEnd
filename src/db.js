const knex = require('knex');
const { knexSnakeCaseMappers } = require('objection');

const db = knex({
   client: 'pg',
   connection: process.env.DATABASE_URL,
   ...knexSnakeCaseMappers()
});

module.exports = { db };