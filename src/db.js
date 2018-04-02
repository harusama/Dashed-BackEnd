const fs = require('fs');
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