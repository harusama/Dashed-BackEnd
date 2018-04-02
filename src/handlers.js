const Glob = require('globby');

const handlers = Glob.sync('./domain/**/handlers.js', { cwd: __dirname })
   .map(path => require('./' + path))
   .reduce((mergedHandlers, requiredHandlers) => Object.assign(mergedHandlers, requiredHandlers));

console.log('handlers', handlers);

module.exports = handlers;