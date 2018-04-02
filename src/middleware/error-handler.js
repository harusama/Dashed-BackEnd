const debug = require('debug')('mw:error-handler');
const boom = require('boom');

function isSchemaValidationError(err) {
   return err.code && err.code === 'SCHEMA_VALIDATION_FAILED';
}

function isInvalidContentTypeError(err) {
   return /Invalid content type/.test(err);
}

function isInvalidMethodForRouteError(err) {
   return /Route defined in Swagger specification/.test(err);
}

function boomify(err) {
   if (err.isBoom) {
      return err;
   } else if (isSchemaValidationError(err)) {
      const extra = err.results;
      err = boom.badRequest(err.message);
      err.output.payload.extra = extra;
      return err;
   } else if (isInvalidContentTypeError(err)) {
      return boom.badRequest(err.message);
   } else if (isInvalidMethodForRouteError(err)) {
      return boom.methodNotAllowed();
   } else {
      return boom.badImplementation();
   }
}

function errorHandler(err, req, res, next) {
   debug(err);
   err = boomify(err);

   return res.status(err.output.statusCode).json({ errors: [err.output.payload] });
}

module.exports = errorHandler;