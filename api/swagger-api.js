const yaml = require('node-yaml');

const swaggerApi = yaml.readSync(__dirname + '/swagger-api.yml', {
   encoding: 'utf-8'
});

module.exports = swaggerApi;
