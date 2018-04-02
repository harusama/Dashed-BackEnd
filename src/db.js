const fs = require('fs');
var pg = require('pg')
pg.types.setTypeParser(20, 'text', parseInt)
const knex = require('knex');
const { knexSnakeCaseMappers } = require('objection');

const db = knex({
   client: 'pg',
   connection: process.env.DATABASE_URL,
   ...knexSnakeCaseMappers()
});

function runSqlFile(pathToFile) {
   return db.raw(fs.readFileSync(pathToFile, { encoding: 'utf-8' }));
}

function truncateDomainTables() {
   return runSqlFile(__dirname + '/../sql/utils/truncate_domain_tables.sql');
}

module.exports = { 
   db,
   truncateDomainTables
};