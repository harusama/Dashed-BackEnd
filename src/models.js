const Glob = require('globby');
const { Model } = require('objection');
const { db } = require('./db');
const mapValues = require('lodash/mapValues');

let models = Glob.sync('./domain/**/model.js', { cwd: __dirname })
   .map(path => require('./' + path))
   .reduce((models, model) => {
      models[model.name] = model;
      return models;
   }, {});

Model.knex(db);

module.exports = models;
